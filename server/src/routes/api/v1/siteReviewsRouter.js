import express from "express"
import objection from "objection"
const { ValidationError } = objection

import { Review } from "../../../models/index.js"
import cleanUserInput from "../../../services/cleanUserInput.js"

const siteReviewsRouter = new express.Router({ mergeParams: true })

siteReviewsRouter.post("/", async (req, res) => {
    const { body } = req
    const formInput = cleanUserInput(body)
    const { textBody, rating } = formInput
    const { siteId } = req.params

    try{
        const newReviewData = await Review.query().insertAndFetch({ textBody, rating, siteId })
        return res.status(201).json({ review: newReviewData })
    }catch(error){
        if(error instanceof ValidationError) {
            return res.status(422).json({ errors: error.data })
        }
        return res.status(500).json({ errors: error })
    }
})

export default siteReviewsRouter