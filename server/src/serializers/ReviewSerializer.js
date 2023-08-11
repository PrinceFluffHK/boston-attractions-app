import VoteSerializer from "./VoteSerializer.js";

class ReviewSerializer {
    static async getSummary(array, user) {
        const serializedReviews = await Promise.all(
            array.map(async (review) => {
                const requiredAttributes = ["textBody", "rating", "userId", "id"];

                let serializedReview = {};
                for (let attribute of requiredAttributes) {
                    serializedReview[attribute] = review[attribute];
                }
                const relatedVotes = await review.$relatedQuery("votes")

                const reviewCreator = await review.$relatedQuery("user")
                serializedReview.creatorName = reviewCreator.username

                let netVoteValue = 0
                serializedReview.votes = relatedVotes.map(vote => {
                    const serializedVote = VoteSerializer.getDetails(vote)

                    netVoteValue += serializedVote.voteValue
                    serializedReview.hasVoted = false
                    if(user) {
                        if(serializedVote.voterId === user.id) {
                            serializedReview.hasVoted = true
                        }
                    }
                    return serializedVote
                })
                serializedReview.netVoteValue = netVoteValue

                return serializedReview;
            })
        );
        return serializedReviews;
    }
}

export default ReviewSerializer;
