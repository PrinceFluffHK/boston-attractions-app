import React, { useEffect, useState } from "react";
import translateServerErrors from "../services/translateServerErrors.js";
import VoteButtons from "./VoteButtons.js";

const ReviewTile = ({ textBody, rating, id, user, netVoteValue, hasVoted, creatorName, setReviews, deleteReview, reviews }) => {
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
           deleteReview(id)
            
            setReviews(reviews.filter(checkIfExists))

            const checkIfExists = (review) => {
                return review.id !== id
            }
        }
    }

    console.log("THESE ARE THE REVIEWS", reviews)

    const editReview = async (value) => {
        try {
            const response = await fetch(`/api/v1/reviews/${id}`, {
            });
            if (!response.ok) {
                let errorMessage = `${response.status} (${response.statusText})`;
                const error = new Error(errorMessage);
                throw error;
            }
            const responseBody = await response.json()
            setReview()
        } catch (error) {
            console.error(`Error in fetch: ${error.message}`);
        }
    };

    const handleEditClick = (event) => {
        event.preventDefault()
        rating: ''
        textBody: ''

    }
    
    // let showModifyReviewButtons;
    // if (creatorName === user.creatorName) {
    //     showModifyReviewButtons = 
    //     <>
    //         <input type="button" value="Edit"/>
    //         <input type="button" value="Delete" onClick={handleDeleteClick}/>
    //     </>
    // }

    const showRating = (rating) => {
        // if(rating === 1) {
        //     return (
        //         <>
        //         <span class="fa fa-star"></span>
        //         <span class="fa fa-star-o"></span>
        //         <span class="fa fa-star-o"></span>
        //         <span class="fa fa-star-o"></span>
        //         <span class="fa fa-star-o"></span>
        //         </>
        //     )
        // }
        // if(rating === 2) {
        //     return (
        //         <>
        //         <span class="fa fa-star"></span>
        //         <span class="fa fa-star"></span>
        //         <span class="fa fa-star-o"></span>
        //         <span class="fa fa-star-o"></span>
        //         <span class="fa fa-star-o"></span>
        //         </>
        //     )
        // }
        // if(rating === 3) {
        //     return (
        //         <>
        //         <span class="fa fa-star"></span>
        //         <span class="fa fa-star"></span>
        //         <span class="fa fa-star"></span>
        //         <span class="fa fa-star-o"></span>
        //         <span class="fa fa-star-o"></span>
        //         </>
        //     )
        // }
        // if(rating === 4) {
        //     return (
        //         <>
        //         <span class="fa fa-star"></span>
        //         <span class="fa fa-star"></span>
        //         <span class="fa fa-star"></span>
        //         <span class="fa fa-star"></span>
        //         <span class="fa fa-star-o"></span>
        //         </>
        //     )
        // }
        // if(rating === 5) {
        //     return(
        //         <>
        //         <span class="fa fa-star"></span>
        //         <span class="fa fa-star"></span>
        //         <span class="fa fa-star"></span>
        //         <span class="fa fa-star"></span>
        //         <span class="fa fa-star"></span>
        //         </>
        //     )
        // }
            const stars = [];
            for (let i = 1; i <= 5; i++) {
                let starClassName = "fa fa-star-o"
                if(i<=rating){
                    starClassName = "fa fa-star"
                }
                // const starClassName = i <= rating ? "fa fa-star" : "fa fa-star-o";
                stars.push(<span key={i} className={starClassName}></span>);
            }
            return <>{stars}</>;
    }

   
    return (
        <div className="callout secondary">
            {/* <p>{rating}/5 Stars!</p> */}
            {showRating(rating)}
            <p>{textBody}</p>
            <p>By: {creatorName}</p>
            <p>{netVoteValue}</p>
            <VoteButtons
                hasVoted={hasVoted}
                handleDownVote={handleDownVote}
                handleUpVote={handleUpVote}
                user={user}
            />
            {/* {showModifyReviewButtons} */}

            {/* <input type="button" value="Edit" onClick={handleEditClick}/> */}
            <input type="button" value="Delete" onClick={handleDeleteClick}/>
       
        </div>
    );
};

export default ReviewTile;
