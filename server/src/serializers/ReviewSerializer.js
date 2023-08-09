import VoteSerializer from "./VoteSerializer.js"

class ReviewSerializer {
    static async getSummary(array) {
        const serializedReviews = await array.map(async review => {
            const requiredAttributes = ["textBody", "rating", "userId"]

            let serializedReview = {}
            for(let attribute of requiredAttributes) {
                serializedReview[attribute] = review[attribute]
            }

            const relatedVotes = await review.$relatedQuery("votes")
            serializedReview.votes = VoteSerializer.getSummary(relatedVotes)

            return serializedReview
        })

        return serializedReviews
    } 
}

export default ReviewSerializer