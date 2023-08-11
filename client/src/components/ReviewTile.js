import React from "react"
import VoteButtons from "./VoteButtons.js";

const ReviewTile = ({
    textBody,
    rating,
    id,
    user,
    netVoteValue,
    hasVoted,
    creatorName,
    setReviewHandler }) => {
        
    const addVote = async (value) => {
        try {
            const response = await fetch(`/api/v1/votes/${id}`, {
                method: "POST",
                headers: new Headers({
                    "Content-Type": "application/json",
                }),
                body: JSON.stringify({ value }),
            });
            if (!response.ok) {
                let errorMessage = `${response.status} (${response.statusText})`;
                const error = new Error(errorMessage);
                throw error;
            }
            setReviewHandler(id, value)
        } catch (error) {
            console.error(`Error in fetch: ${error.message}`);
        }
    };

    const handleUpVote = (event) => {
        event.preventDefault();
        if (!hasVoted) {
            addVote(1);
        }
    };

    const handleDownVote = (event) => {
        event.preventDefault();
        if (!hasVoted) {
            addVote(-1);
        }
    };
    // delete stuff
    const currentUser = props.currentUser
    const handleDeleteClick = (event) => {
        event.preventDefault()
        if (window.confirm("Are you sure you want to delete this review?")) {
            props.deleteReview(props.id)
        }
    }
    const deleteButton = currentUser && currentUser.id === props.userId ? (
        <input type="button" value="Delete" onClick={handleDeleteClick} />
    ) : null;

    //-----------------------------------------------------



    const showRating = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            let starClassName = "fa fa-star-o"
            if (i <= rating) {
                starClassName = "fa fa-star"
            }
            stars.push(<span key={i} className={starClassName}></span>);
        }
        return <>{stars}</>;
    }

    return (
        <div className="callout secondary container">
            <div className="container__row">
                <p className="container__col-md-6">{showRating(rating)}</p>
                <div className="container__col-md-6" >
                    <div className="container">
                        <VoteButtons
                            hasVoted={hasVoted}
                            handleDownVote={handleDownVote}
                            handleUpVote={handleUpVote}
                            user={user}
                            netVoteValue={netVoteValue}
                        />
                    </div>
                </div>
            </div>
            <div className="container__row ">
                <p className="container__col-md-8">{textBody}</p>
            </div>
            <div className="container__row small-gray">
                <p>Review by {creatorName}</p>
            </div>
            {deleteButton}
        </div>
    )
}
export default ReviewTile