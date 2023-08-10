import express from "express";
import { Vote } from "../../../models/index.js";
import { ValidationError } from "objection";

const reviewsRouter = new express.Router()

reviewsRouter.post("/:id", async (req, res) => {
    const { body, user } = req
    console.log(body)
    const formInput = {
        voteValue: body.value,
        reviewId: req.params.id,
        voterId: user.id
    }
    try {
        const persistedVote = await Vote.query().insertAndFetch(formInput)
        console.log("persisting vote...")
        return res.status(200).json({ vote: persistedVote })
    } catch (error) {
        if (error instanceof ValidationError) {
            return res.status(422).json({ errors: error.data })
        }
        return res.status(500).json({ errors: error })
    }
})

export default reviewsRouter