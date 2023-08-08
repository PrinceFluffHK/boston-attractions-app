import express from "express"

import { Site, Review } from "../../../models/index.js"

const siteReviewsRouter = new express.Router({ mergeParams: true })



export default siteReviewsRouter