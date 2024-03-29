import express from "express";
import userSessionsRouter from "./api/v1/userSessionsRouter.js";
import usersRouter from "./api/v1/usersRouter.js";
import clientRouter from "./clientRouter.js";
import sitesRouter from "./api/v1/sitesRouter.js";
import reviewsRouter from "./api/v1/reviewsRouter.js"

import votesRouter from "./api/v1/votesRouter.js";
const rootRouter = new express.Router();

rootRouter.use("/", clientRouter);
rootRouter.use("/api/v1/user-sessions", userSessionsRouter);
rootRouter.use("/api/v1/users", usersRouter);
rootRouter.use("/api/v1/sites", sitesRouter);
rootRouter.use("/api/v1/reviews", reviewsRouter);
rootRouter.use("/api/v1/votes", votesRouter)

export default rootRouter;