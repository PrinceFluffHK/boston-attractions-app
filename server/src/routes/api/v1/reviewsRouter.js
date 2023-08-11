import express from "express"
import objection from "objection"
import { Review } from "../../../models/index.js"

const reviewsRouter = new express.Router()
reviewsRouter.delete("/:id", async (req, res) => {
    const reviewId = req.params.id;
    try {
        const review = await Review.query().findById(reviewId);
        if (!review) {
            return res.status(404).json({ error: 'Review not found' });
        }
        if (review.userId !== req.user.id) {
            return res.status(403).json({ error: 'Unauthorized to delete this review' });
        }
        await review.$query().delete();
        res.json({ message: 'Review deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while deleting the review' });
    }
});
export default reviewsRouter