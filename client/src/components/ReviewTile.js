import React, { useEffect, useState } from "react";
import VoteButtons from "./VoteButtons.js";

const ReviewTile = ({
    textBody,
    rating,
    id,
    user,
    netVoteValue,
    hasVoted,
    creatorName,
    setReviewHandler,
}) => {
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

    const showRating = (rating) => {
            const stars = [];
            for (let i = 1; i <= 5; i++) {
                let starClassName = "fa fa-star-o"
                if(i<=rating){
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
        </div>
    );
};

export default ReviewTile;
