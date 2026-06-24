import { NextFunction, Request, Response, Router } from "express";

import { userController } from "./user.controller";
import { jwtUtils } from "../../utils/jwt";
import config from "../../config";
import { Role } from "../../../generated/prisma/enums";
import httpStatus from "http-status";

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string;
                name: string;
                email: string;
                role: Role;
            };
        }
    }
}

const router = Router();


router.post('/register', userController.registerUser
)

router.get('/me', (req: Request, res: Response, next: NextFunction) => {
    const { accessToken } = req.cookies
    const verifyToken = jwtUtils.verifyToken(accessToken, config.jwt_access_secret)

    if (typeof verifyToken === 'string') {
        throw new Error(verifyToken)
    }
    const { id, name, email, role } = verifyToken
    // const requiredRoles = [ 'ADMIN','USER','AUTHOR']
    const requiredRoles = [Role.ADMIN, Role.AUTHOR, Role.USER]
    if (!requiredRoles.includes(role)) {
        return res.status(403).json({
            success: false,
            statusCode: httpStatus.FORBIDDEN,
            message: "Forbidden! "
        })
    }

    req.user = {
        id,
        name,
        email,
        role
    }

    next()
}, userController.getMyProfile)
router.get('/', userController.getAllUsers)


export const userRoutes = router