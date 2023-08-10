import React, { useEffect, useState } from "react";
import translateServerErrors from "../services/translateServerErrors.js";

const ReviewTile = ({ textBody, rating, votes, id, user }) => {
    const [voteValue, setVoteValue] = useState(0);
    const [hasVoted, setHasVoted] = useState(false);
    
    const calculateNetVotes = () => {
        let netTotal = 0
        votes.forEach(vote => {
            netTotal += vote.voteValue
        })
        setVoteValue(netTotal)
    }
    
    
    useEffect(() => {
        calculateNetVotes()
        votes.forEach(vote => {
            if (user) {
                console.log("voterId", vote.voterId)
                console.log("userid?", user.id)
                if (vote.voterId === user.id) {
                    console.log("found matching vote")
                    setHasVoted(true)
                }
            }
        })
        // checkIfVoted()
    })
    
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
            console.log("incrementing...", voteValue, value)
            const newValue = voteValue + value
            setVoteValue(newValue)
            setHasVoted(true)
        } catch (error) {
            console.error(`Error in fetch: ${error.message}`)
        }
    };
    
    const handleUpVote = (event) => {
        event.preventDefault();
        console.log(hasVoted)
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
            <button type="text" onClick={handleUpVote}>UpVote</button>
            <button type="text" onClick={handleDownVote}>DownVote</button>
        </div>
    );
};

export default ReviewTile;
