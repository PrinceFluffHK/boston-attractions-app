import React, {useState} from "react"
// const props = { textBody, rating, userId }
const ReviewTile = (props) => {
    // const [deleteReview, setDeleteReview] = useState({})

    // const handleEditClick = () => {

    // }
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
            <p>
                {props.rating}/5 Stars!
            </p>
            <p>
                {props.textBody}
            </p>
            {/* <p>-{username}</p> */}
            {/* <input type="button" value="Edit" onClick={handleEditClick}/> */}
            <input type="button" value="Delete" onClick={handleDeleteClick}/>
        </div>
    )
}

export default ReviewTile