import React from "react"

const ReviewTile = ({ textBody, rating }) => {
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