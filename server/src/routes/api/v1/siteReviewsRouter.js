import express from "express"
import objection from "objection"
const { ValidationError } = objection

import { Review, Site } from "../../../models/index.js"
import cleanUserInput from "../../../services/cleanUserInput.js"

const siteReviewsRouter = new express.Router({ mergeParams: true })

siteReviewsRouter.post("/", async (req, res) => {
    console.log("Am I empty inside?", req)
    const { body } = req
    const formData = cleanUserInput(body)
    const { textBody, rating } = formData
    const { siteId } = req.params
    const userId = (req.user.id)
    console.log("1. Look at all this sheit", body, formData, siteId, userId)
    
    try{
        const site = await Site.query().findById(siteId)
        site.reviews = await site.$relatedQuery("reviews")
        const newReview = await Review.query().insertAndFetch({ textBody, rating, siteId, userId })
        console.log("2. Even more other sheit??", body, formData, siteId, userId)

        console.log("and IIII'm a NEW review", newReview)
        return res.status(201).json({ newReview })
    } catch (error) {
        if (error instanceof ValidationError) {
            return res.status(422).json({ errors: error.data })
        }
        return res.status(500).json({ errors: error })
    }
})

export default siteReviewsRouter