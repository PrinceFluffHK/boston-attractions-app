import React, { useEffect, useState } from "react";
import translateServerErrors from "../services/translateServerErrors.js";
import VoteButtons from "./VoteButtons.js";

const ReviewTile = ({ textBody, rating, id, user, netVoteValue, hasVoted, creatorName, setReviews }) => {
        // const [deleteReview, setDeleteReview] = useState({})

    const addVote = async (value) => {
        try {
            const response = await fetch(`/api/v1/reviews/${id}`, {
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
            // const newValue = voteValue + value
            // update state of reviews: find the review we voted and change its hasVoted status
            netVoteValue += value;
            hasVoted = true;


        } catch (error) {
            console.error(`Error in fetch: ${error.message}`);
        }
    };
    
    const handleUpVote = (event) => {
        console.log("netVoteValue: ", netVoteValue);
        event.preventDefault();
        if (!hasVoted) {
            addVote(1);
        }
        console.log("netVoteValue: ", netVoteValue);
    };

    const handleDownVote = (event) => {
        event.preventDefault();
        if (!hasVoted) {
            addVote(-1);
        }
    };

    const handleDeleteClick = (event) => {
        event.preventDefault()
        if(window.confirm("Are you sure you want to delete this review?")){
            deleteReview(props.review)
        }
    }
    
            //  make a DELETE fetch to the backend on a new endpoint to delete the review from the database 
            
                //  after you get a response back, then you need to delete the review from reviews state (which is way up in SiteShow)
                    // nick recommends using the .filter method to remove the review from reviews state



    return (
        <div className="callout secondary">
            <p>{rating}/5 Stars!</p>
            <p>{textBody}</p>
            <p>By: {creatorName}</p>
            <p>{netVoteValue}</p>
            <VoteButtons
                hasVoted={hasVoted}
                handleDownVote={handleDownVote}
                handleUpVote={handleUpVote}
                user={user}
            />
            <input type="button" value="Delete" onClick={handleDeleteClick}/>
        </div>
    );
};

export default ReviewTile;
