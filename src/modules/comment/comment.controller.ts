import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";

const createComment = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

})

const getAllCommentByAuthorId = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

})

const getAllCommentByCommentId = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

})

const updateComment = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

})
const deleteComment = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
})





export const commentController = {
    createComment,
    getAllCommentByAuthorId,
    getAllCommentByCommentId,
    updateComment,
    deleteComment
}