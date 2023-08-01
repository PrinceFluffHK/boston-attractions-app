import express from "express";
import userSessionsRouter from "./api/v1/userSessionsRouter.js";
import usersRouter from "./api/v1/usersRouter.js";
import clientRouter from "./clientRouter.js";
import sitesRouter from "./api/v1/sitesRouter.js";
const rootRouter = new express.Router();
rootRouter.use("/api/v1/user-sessions", userSessionsRouter);
rootRouter.use("/api/v1/users", usersRouter);


rootRouter.use("/api/v1/sites", sitesRouter)
rootRouter.use("/", clientRouter);

export default rootRouter;
