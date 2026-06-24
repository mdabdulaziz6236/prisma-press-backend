import { Router } from "express";

import { userController } from "./user.controller";

import { Role } from "../../../generated/prisma/enums";

import { auth } from "../../middlewares/auth";

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

router.get('/me',


    //     (req: Request, res: Response, next: NextFunction) => {
    //     const { accessToken } = req.cookies
    //     const verifyToken = jwtUtils.verifyToken(accessToken, config.jwt_access_secret)

    //     if (!verifyToken.success) {
    //         throw new Error(verifyToken.message)
    //     }
    //     const { id, name, email, role } = verifyToken.data as JwtPayload
    //     // const requiredRoles = [ 'ADMIN','USER','AUTHOR']
    //     const requiredRoles = [Role.ADMIN, Role.AUTHOR, Role.USER]
    //     if (!requiredRoles.includes(role)) {
    //         return res.status(403).json({
    //             success: false,
    //             statusCode: httpStatus.FORBIDDEN,
    //             message: "Forbidden! "
    //         })
    //     }

    //     req.user = {
    //         id,
    //         name,
    //         email,
    //         role
    //     }

    //     next()
    // }


    auth(Role.ADMIN, Role.AUTHOR, Role.USER), userController.getMyProfile)
router.get('/', userController.getAllUsers)


export const userRoutes = router