import { NextFunction, Request, RequestHandler, Response } from "express"

import httpStatus from "http-status"
import { userService } from "./user.service"
import { catchAsync } from "../../utils/catchAsync"
import { sendResponse } from "../../utils/sendResponse"
import jwt from 'jsonwebtoken'
import config from "../../config"
import { jwtUtils } from "../../utils/jwt"



const registerUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const payload = req.body
    const user = await userService.registerUserIntoDB(payload)


    // res.status(httpStatus.CREATED).json({
    //     success: true,
    //     statusCode: httpStatus.CREATED,
    //     message: "User registered succesfully",
    //     data: {
    //         user
    //     }
    // })

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "User registered successfully.",
        data: user,

    })

})

// const registerUser = async (req: Request, res: Response) => {
//     try {
//         const payload = req.body
//         const user = await userService.registerUserIntoDB(payload)


//         res.status(httpStatus.CREATED).json({
//             success: true,
//             statusCode: httpStatus.CREATED,
//             message: "User registered succesfully",
//             data: {
//                 user
//             }
//         })
//     } catch (error) {
//         res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
//             success: false,
//             statusCode: httpStatus.INTERNAL_SERVER_ERROR,
//             message: "Failed to register user",
//             error: (error as Error).message
//         })
//     }
// }

const getMyProfile = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    // const { accessToken } = req.cookies
    // const verifyToken = jwtUtils.verifyToken(accessToken, config.jwt_access_secret)

    // console.log(req.user)
    // if (typeof verifyToken === 'string') {
    //     throw new Error(verifyToken)
    // }
    const profile = await userService.getProfileFromDB(req.user?.id as string)
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "User profile fetched successfully",
        data: { profile }
    })
})

const updateMyProfile = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const payload = req.body
    if(!payload){
        throw new Error("No data provided for update")
    }
    const updatedProfile = await userService.updateMyProfileInDB(req.user?.id as string, payload)

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "User profile updated successfully",
        data: { updatedProfile }
    })
})


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
    getMyProfile,
    updateMyProfile,
    getAllUsers
}

