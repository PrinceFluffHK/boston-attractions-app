import React, { useState } from "react"

const ReviewTile = ({ textBody, rating, votes }) => {
    const [voteValue, setVoteValue] = useState(0)

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