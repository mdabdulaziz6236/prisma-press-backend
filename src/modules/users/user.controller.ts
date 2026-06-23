import { Request, Response } from "express"
import { prisma } from "../../lib/prisma"
import bcrypt from "bcryptjs"
import config from "../../config"
import httpStatus from "http-status"
import { userService } from "./user.service"


const registerUser = async (req: Request, res: Response) => {
    try {
        const payload = req.body
        const user = await userService.registerUserIntoDB(payload)


        res.status(httpStatus.CREATED).json({
            success: true,
            statusCode: httpStatus.CREATED,
            message: "User registered succesfully",
            data: {
                user
            }
        })
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            statusCode: httpStatus.INTERNAL_SERVER_ERROR,
            message: "Failed to register user",
            error: (error as Error).message
        })
    }
}


const getAllUsers = (req: Request, res: Response) => {

    const user = userService.getAllUsersFromDB

    res.status(httpStatus.OK).json({
        success: true,
        statusCode: httpStatus.OK,
        message: "User fetched succesfully",
        data: {
            user
        }
    })
}
export const userController = {
    registerUser,
    getAllUsers
}

