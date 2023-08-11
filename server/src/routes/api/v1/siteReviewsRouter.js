import express from "express"
import objection from "objection"
const { ValidationError } = objection

import { Review, Site, User } from "../../../models/index.js"
import cleanUserInput from "../../../services/cleanUserInput.js"

const siteReviewsRouter = new express.Router({ mergeParams: true })
siteReviewsRouter.post("/", async (req, res) => {
    const { body } = req
    const formData = cleanUserInput(body)
    formData.siteId = req.params.siteId
    formData.userId = req.user.id
    try {
        const newReview = await Review.query().insertAndFetch(formData)
        newReview.hasVoted = false
        newReview.netVoteValue = 0
        return res.status(201).json({ newReview })
    } catch (error) {
        if (error instanceof ValidationError) {
            return res.status(422).json({ errors: error.data })
        }
        return res.status(500).json({ errors: error })
    }
})
export default siteReviewsRouter