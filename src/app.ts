import cookieParser from "cookie-parser";
import express, { Application, Request, Response } from "express";
import cors from 'cors'
import config from "./config";
import { userRoutes } from "./modules/users/user.route";
import { authRoutes } from "./modules/auth/auth.route";
import { postRoutes } from "./modules/post/post.route";
import { commentRoutes } from "./modules/comment/comment.route";

const app: Application = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors({
    origin: config.app_url,
    credentials: true
}))


app.get('/', async (req: Request, res: Response) => {
    res.send("Prisma Press Backend API is running.")
})


app.use('/api/users', userRoutes)
app.use('/api/users', authRoutes)
app.use('/api/posts', postRoutes)
app.use('/api/comments', commentRoutes)


export default app;