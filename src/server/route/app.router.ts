import { createRouter } from "../createRouter";
import { postRouter } from "./post.router";
import { userRouter } from "./user.router";

export const AppRouter = createRouter()
  .merge("users.", userRouter)
  .merge("posts.", postRouter);

export type AppRouter = typeof AppRouter;
