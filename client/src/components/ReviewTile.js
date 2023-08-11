import React, { useState } from "react"
const ReviewTile = (props) => {
    const handleDeleteClick = (event) => {
        event.preventDefault()
        if (window.confirm("Are you sure you want to delete this review?")) {
            props.deleteReview(props.id)
        }
    }
    const currentUser = props.currentUser
    const deleteButton = currentUser && currentUser.id === props.userId ? (
        <input type="button" value="Delete" onClick={handleDeleteClick} />
    ) : null;

    return (
        <div className="callout secondary">
            <p>
                {props.rating}/5 Stars!
            </p>
            <p>
                {props.textBody}
            </p>
            {deleteButton}
        </div>
    )
}
export default ReviewTile