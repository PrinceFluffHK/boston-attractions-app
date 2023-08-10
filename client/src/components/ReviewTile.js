import React, { useEffect, useState } from "react";
import translateServerErrors from "../services/translateServerErrors.js";
import VoteButtons from "./VoteButtons.js";

const ReviewTile = ({ textBody, rating, votes, id, user }) => {
    const [voteValue, setVoteValue] = useState(0);
    const [hasVoted, setHasVoted] = useState(false);
    
    const voteInit = () => {
        let netTotal = 0
        votes.forEach(vote => {
            netTotal += vote.voteValue
            if (user) {
                if (vote.voterId === user.id) {
                    setHasVoted(true)
                }
            }
        })
        setVoteValue(netTotal)
    }
    
    useEffect(() => {
        voteInit()
    }, [user])
    
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
            const newValue = voteValue + value
            setVoteValue(newValue)
            setHasVoted(true)
        } catch (error) {
            console.error(`Error in fetch: ${error.message}`)
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

    return (
        <div className="callout secondary">
            <p>{rating}/5 Stars!</p>
            <p>{textBody}</p>
            <p>{voteValue}</p>
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
