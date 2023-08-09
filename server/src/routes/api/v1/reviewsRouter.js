import express from "express";

const reviewsRouter = new express.Router()

reviewsRouter.post("/:id")

export default reviewsRouter