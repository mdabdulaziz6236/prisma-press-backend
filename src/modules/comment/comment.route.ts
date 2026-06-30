import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";
import { commentController } from "./comment.controller";

const router = Router()


router.post('/', auth(Role.USER, Role.ADMIN, Role.AUTHOR), commentController.createComment)

router.get('/author/:authorId', commentController.getAllCommentByAuthorId)

router.get('/:commentId', commentController.getAllCommentByCommentId)

router.patch('/:commentId', auth(Role.USER, Role.ADMIN, Role.AUTHOR), commentController.updateComment)

router.delete('/:commentId', auth(Role.USER, Role.ADMIN, Role.AUTHOR), commentController.deleteComment)


export const commentRoutes = router