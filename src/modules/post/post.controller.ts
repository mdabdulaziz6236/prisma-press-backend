import { NextFunction, Request, Response } from "express"
import { catchAsync } from "../../utils/catchAsync"
import { postService } from "./post.service"
import { sendResponse } from "../../utils/sendResponse"
import httpStatus from "http-status"

const createPost = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const id = req.user?.id
    const payload = req.body

    const result = await postService.createPost(payload, id as string)

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Post created successfully",
        data: result
    })
})


const getAllPosts = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await postService.getAllPosts()
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Posts fetched successfully",
        data: result
    })
})


const getPostsStats = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await postService.getPostsStats()
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Posts stats retrieved successfully",
        data: result
    })
})

const getMyPosts = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const id = req.user?.id
    const result = await postService.getMyPosts(id as string)
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "My Posts fetched successfully",
        data: result
    })

})

const getPostById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const postId = req.params.postId
    if (!postId) {
        throw new Error("Post ID is required in params")

    }
    const result = await postService.getPostById(postId as string)
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Post fetched successfully",
        data: result
    })
})

const updatePost = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const authorId = req.user?.id
    const postId = req.params.postId
    const isAdmin = req.user?.role === 'ADMIN'
    const payload = req.body

    const result = await postService.updatePost(payload, postId as string, authorId as string, isAdmin)

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Post Updated Successfully",
        data: result
    })


})



const deletePost = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const authorId = req.user?.id
    const postId = req.params.postId
    const isAdmin = req.user?.role === 'ADMIN'

    if (!postId) {
        throw new Error("Post ID is required in params")
    }
    await postService.deletePost(postId as string, authorId as string, isAdmin)
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Post deleted Successfully",
        data: null
    })

})

const moderateComment = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

})

export const postController = {
    createPost,
    getAllPosts,
    getPostsStats,
    getMyPosts,
    getPostById,
    updatePost,
    deletePost,
    moderateComment
}