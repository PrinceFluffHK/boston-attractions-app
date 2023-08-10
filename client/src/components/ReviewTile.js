import React, { useEffect, useState } from "react";
import translateServerErrors from "../services/translateServerErrors.js";
import VoteButtons from "./VoteButtons.js";

const ReviewTile = ({ textBody, rating, id, user, netVoteValue, hasVoted, creatorName }) => {
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
    // console.log("hasVoted", hasVoted);
    
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
        </div>
    );
};

export default ReviewTile;
