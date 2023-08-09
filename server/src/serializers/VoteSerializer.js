class VoteSerializer {
    static getSummary(array) {
        const serializedVotes = array.map((vote) => {
            const requiredAttributes = ["voteValue"];

            let serializedVote = {};
            for (let attribute of requiredAttributes) {
                serializedVote[attribute] = vote[attribute];
            }

            return serializedVote;
        });

        return serializedVotes;
    }
}

export default VoteSerializer;
