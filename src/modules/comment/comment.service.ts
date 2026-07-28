import { prisma } from "../../lib/prisma"
import { ICreateCommentPayload, IModerateCommentPayload, IUpdateCommentPayload } from "./comment.interface"

const createComment = async (authorId: string, payload: ICreateCommentPayload) => {

    await prisma.post.findUniqueOrThrow({
        where: {
            id: payload.postId
        }
    })

    const comment = await prisma.comment.create({
        data: {
            ...payload,
            authorId
        },
        // include: {
        //     post: true
        // }
    })
    return comment

}

const getAllCommentByAuthorId = async (authorId: string) => {
    const comments = await prisma.comment.findMany({
        where: {
            authorId
        },
        orderBy: {
            createdAt: "desc"
        },
        include: {
            post: {
                select: {
                    id: true,
                    title: true
                }
            }
        }
    })
    return comments
}

const getAllCommentByPostId = async (postId: string) => {
    const comments = await prisma.comment.findUnique({
        where: {
            id: postId
        }
    })
    return comments
}

const updateComment = async (commentId: string, data: IUpdateCommentPayload, authorId: string) => {
    const commentData = await prisma.comment.findUniqueOrThrow({
        where: {
            id: commentId,
            authorId
        },
        select: {
            id: true
        }
    })

    // if (!commentData) {
    //     throw new Error("Your provided input is not valid")
    // }

    const comment = await prisma.comment.update({
        where: {
            id: commentId
        },
        data
    })


    return comment

}

const deleteComment = async (commentId: string, authorId: string) => {
    const commentData = await prisma.comment.findUniqueOrThrow({
        where: {
            id: commentId,
            authorId
        },
        select: {
            id: true
        }
    })

    // if (!commentData) {
    //     throw new Error("Your provided input is invalid")
    // }

    const comment = await prisma.comment.delete({
        where: {
            id: commentData.id
        }
    })

    return comment
}

const moderateComment = async (commentId: string, data: IModerateCommentPayload) => {

    const commentData = await prisma.comment.findFirstOrThrow({
        where: {
            id: commentId
        },
        select: {
            id: true,
            status: true
        }
    });
    if (commentData.status === data.status) {
        throw new Error(`Your provided status (${data.status}) is already up to date.`)
    }

    const comment = await prisma.comment.update({
        where: {
            id: commentId
        },
        data
    })
    return comment

}

export const commentService = {
    createComment,
    getAllCommentByAuthorId,
    getAllCommentByPostId,
    updateComment,
    deleteComment,
    moderateComment
}