// import Review from "../models/Review.js"
import VoteSerializer from "./VoteSerializer.js";

class ReviewSerializer {
    static async getSummary(array) {
        const serializedReviews = await Promise.all(
            array.map(async (review) => {
                const requiredAttributes = ["textBody", "rating", "userId", "id"];

                let serializedReview = {};
                for (let attribute of requiredAttributes) {
                    serializedReview[attribute] = review[attribute];
                }
                const relatedVotes = await review.$relatedQuery("votes")
                serializedReview.votes = VoteSerializer.getSummary(relatedVotes)

                return serializedReview;
            })
        );
        return serializedReviews;
    }
}

export default ReviewSerializer;
