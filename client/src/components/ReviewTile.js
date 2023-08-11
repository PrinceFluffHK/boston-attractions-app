import React from "react"
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
// import React, { useEffect, useState } from "react";
// import VoteButtons from "./VoteButtons.js";

// const ReviewTile = ({
//     textBody,
//     rating,
//     id,
//     user,
//     netVoteValue,
//     hasVoted,
//     creatorName,
//     setReviewHandler,
// }) => {
//     const addVote = async (value) => {
//         try {
//             const response = await fetch(`/api/v1/votes/${id}`, {
//                 method: "POST",
//                 headers: new Headers({
//                     "Content-Type": "application/json",
//                 }),
//                 body: JSON.stringify({ value }),
//             });
//             if (!response.ok) {
//                 let errorMessage = `${response.status} (${response.statusText})`;
//                 const error = new Error(errorMessage);
//                 throw error;
//             }
//             setReviewHandler(id, value)
//         } catch (error) {
//             console.error(`Error in fetch: ${error.message}`);
//         }
//     };

//     const handleUpVote = (event) => {
//         event.preventDefault();
//         if (!hasVoted) {
//             addVote(1);
//         }
//     };

//     const handleDownVote = (event) => {
//         event.preventDefault();
//         if (!hasVoted) {
//             addVote(-1);
//         }
//     };

//     return (
//         <div className="callout secondary container">
//             <div className="container__row">
//                 <p className="container__col-md-6">{rating}/5 Stars!</p>
//                 <div className="container__col-md-6" >
//                     <div className="container">
//                         <VoteButtons    
//                             hasVoted={hasVoted}
//                             handleDownVote={handleDownVote}
//                             handleUpVote={handleUpVote}
//                             user={user}
//                             netVoteValue={netVoteValue}
//                         />
//                     </div>
//                 </div>
//             </div>
//             <div className="container__row ">
//                 <p className="container__col-md-8">{textBody}</p>
//             </div>
//             <div className="container__row small-gray">
//                 <p>Review by {creatorName}</p>
//             </div>
//         </div>
//     );
// };