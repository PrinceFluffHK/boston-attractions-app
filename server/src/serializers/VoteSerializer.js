class VoteSerializer {
    static getDetails(vote, user) {
        const requiredAttributes = ["voteValue", "voterId"];

        let serializedVote = {};
        for (let attribute of requiredAttributes) {
            serializedVote[attribute] = vote[attribute];
        }

        return serializedVote;
    }
}

export default VoteSerializer;
