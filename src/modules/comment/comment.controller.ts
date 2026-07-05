import httpStatus from "http-status";
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { commentService } from "./comment.service";
import { sendResponse } from "../../utils/sendResponse";

const createComment = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const authorId = req.user?.id as string;
    const result = await commentService.createComment(authorId, req.body);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Comment created successfully",
        data: result
    })
})

const getAllCommentByAuthorId = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { authorId } = req.params
    const result = await commentService.getAllCommentByAuthorId(authorId as string)
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Comments retrieved successfully",
        data: result
    })


})

const getAllCommentByCommentId = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { commentId } = req.params
    const result = await commentService.getAllCommentByCommentId(commentId as string)
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Comment retrieved successfully",
        data: result
    })
})

const updateComment = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    const { commentId } = req.params;
    const authorId = user?.id as string;
    const payload = req.body;
    const result = await commentService.updateComment(commentId as string, payload, authorId)
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Comment updated successfully",
        data: result
    })
})
const deleteComment = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    const { commentId } = req.params;
    const authorId = user?.id as string;
    const result = await commentService.deleteComment(commentId as string, authorId)
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Comment deleted successfully",
        data: result
    })
})


const moderateComment = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { commentId } = req.params;
    const payload = req.body;
    const result = await commentService.modarateComment(commentId as string, payload);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Comment moderated successfully",
        data: result
    });
})


export const commentController = {
    createComment,
    getAllCommentByAuthorId,
    getAllCommentByCommentId,
    updateComment,
    deleteComment,
    moderateComment
}