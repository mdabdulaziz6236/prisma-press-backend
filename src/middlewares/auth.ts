import { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { catchAsync } from "../utils/catchAsync";
import { jwtUtils } from "../utils/jwt";
import { prisma } from "../lib/prisma";
import { NextFunction, Request, Response } from "express";
import { Role } from "../../generated/prisma/enums";

// auth(Role.ADMIN, Role.AUTHOR, Role.USER)
// auth() => ...requiredRoles => [Role.ADMIN, Role.AUTHOR, Role.USER]
export const auth = (...requiredRoles: Role[]) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {

        const token = req.cookies.accessToken ?
            req.cookies.accessToken :
            req.headers.authorization?.startsWith("Bearer ") ?
                req.headers.authorization?.split(" ")[1] :
                req.headers.authorization;
        if (!token) {
            throw new Error("you are not authenticated! Please login to get access.")

        }
        const verifyToken = jwtUtils.verifyToken(token, config.jwt_access_secret)

        if (!verifyToken.success) {
            throw new Error(verifyToken.message)
        }
        const { id, name, email, role } = verifyToken.data as JwtPayload

        if (requiredRoles.length && !requiredRoles.includes(role)) {
            throw new Error("Forbidden! You don't have permission to access this resource.")
        }


        const user = await prisma.user.findUnique({
            where: {
                id,
                email,
                name,
                role
            }
        })

        if (!user) {
            throw new Error("User not found. Invalid token.")
        }

        if (user.activeStatus === 'BLOCKED') {
            throw new Error("Your account has been blocked. Please contact support for more information.")
        }

        req.user = {
            id,
            name,
            email,
            role
        }
        next()
    }
    )
}