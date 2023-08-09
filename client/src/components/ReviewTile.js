import React, { useState } from "react"

const ReviewTile = ({ textBody, rating, votes }) => {
    const [voteValue, setVoteValue] = useState(0)
    const [hasVoted, setHasVoted] = useState(false)

    const handleUpVote = (event) => {
        event.preventDefault()
        addVote(1)
    }
    
    const handleDownVote = (event) => {
        event.preventDefault()
        addVote(-1)
    }

    const addVote = (value) => {
        try {
            const response = fetch(`/api/v1/reviews/${reviewId}`)
        } catch (error) {
            
        }
    }

    return (
        <div className="callout secondary">
            <p>
                {rating}/5 Stars!
            </p>
            <p>
                {textBody}
            </p>
        </div>
    )
}

export default ReviewTile