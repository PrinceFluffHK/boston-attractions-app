import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom"
import translateServerErrors from "../services/translateServerErrors.js"
import Site from "../../../server/src/models/Site.js"

const ReviewForm = (props) => {
    const location = useLocation()
    const siteId = location.pathname[1]
    const [newReview, setNewReview] = useState({
        userId: props.user.id,
        siteId: siteId,
        textBody: "",
        rating: ""
    })

    const [errors, setErrors] = useState([])

    const [currentUser, setCurrentUser] = useState(undefined);
    
    // const [shouldRedirect, setShouldRedirect] = useState(false);

    const addNewReview = async () => {
        try {
            const response = await fetch(`/api/v1/sites/${siteId}/new-review`, {
                method: "POST",
                headers: new Headers({
                    "Content-Type": "application/json",
                }),
                body: JSON.stringify(newReview),
            })
            if(!response.ok) {
                console.log('site:', site)
                if(response.status === 422){
                    const body = await response.json()
                    const newErrors = translateServerErrors(body.errors)
                    return setErrors(newErrors)
                } else {
                    const errorMessage = `${response.status}(${response.statusText})`
                    const error = new Error(errorMessage)
                    throw error
                }
            } else {
                const responseBody = await response.json()
                const updatedReviews = site.reviews.concat(responseBody.review)
                setErrors([])
                setCurrentUser(currentUser)
                setNewReview({...site, reviews: updatedReviews})
                setShouldRedirect(true)
                console.log(site)
            }
        } catch (error) {
            console.error(`Error in fetch: ${error.message}`)
        }
    }

    const handleInputChange = event =>{
        setNewReview({
            ...newReview,
            [event.currentTarget.name]: event.currentTarget.value
        })
    }

    // if(shouldRedirect){
    //     location.href=`/${siteId}`
    // }

    const handleSubmit = (event) =>{
        event.preventDefault()
        addNewReview()
    }

    return (
        <div>
            <h1>
                Add a Review
            </h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="textBody">
                    Review:
                    <input
                        id="textBody"
                        type="text"
                        name="textBody"
                        value={newReview.textBody}
                        onChange={handleInputChange}
                    />
                </label>
                <label htmlFor="rating">
                    Rating
                    <input
                        id="rating"
                        type="text"
                        name="rating"
                        value={newReview.rating}
                        onChange={handleInputChange}
                    />
                </label>
                <Link to={`/${siteId}`}>
                    Back
                </Link>
                <input type="submit" value="Submit Review"/>
            </form>
        </div>
    )
}


export default ReviewForm