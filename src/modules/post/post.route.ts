import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";
import { postController } from "./post.controller";

const router = Router()


router.post('/', auth(Role.ADMIN, Role.USER, Role.AUTHOR), postController.createPost)


router.get('/', postController.getAllPosts)

router.get('/stats', auth(Role.ADMIN, Role.USER, Role.AUTHOR), postController.getPostsStats)

router.get('/my-posts', auth(Role.ADMIN, Role.AUTHOR, Role.USER), postController.getMyPosts)

router.get('/:postId', postController.getPostById)

router.patch('/:postId', auth(Role.ADMIN, Role.AUTHOR, Role.USER), postController.updatePost)

router.delete('/:postId', auth(Role.ADMIN, Role.AUTHOR, Role.USER), postController.deletePost)

router.put('/:commentId/moderate', auth(Role.ADMIN), postController.moderateComment)

export const postRoutes = router