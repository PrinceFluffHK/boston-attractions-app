import React, { useState } from "react";
import { Link } from "react-router-dom"
import RatingOptions from "./RatingOptions.js";

import translateServerErrors from "../services/translateServerErrors.js"


const ReviewForm = (props, {currentUser}) => {
    
    const [newReview, setNewReview] = useState({
        textBody: "",
        rating: ""
    })
    
    const [errors, setErrors] = useState({})
    const site = props.site

    
    const addNewReview = async (formData) => {
        try {
            const response = await fetch(`/api/v1/sites/${site.id}/reviews`, {
                method: "POST",
                headers: new Headers({
                    "Content-Type": "application/json",
                }),
                body: JSON.stringify(formData)
            })

            if (!response.ok) {
                if (response.status === 422) {
                    const body = await response.json()
                    const newErrors = translateServerErrors(body.errors)
                    return setErrors(newErrors)
                } else {
                    throw (new Error(`${response.status} (${response.statusText})`))
                }
            } else {
                const responseBody = await response.json()
                const reviewData = site.reviews.concat(responseBody.newReview)
                setErrors({})
                props.setSite({ ...site, reviews: reviewData })
            }
        } catch (error) {
            console.error(`Error in fetch: ${error.message}`)
        }
    }

    const handleInputChange = (event) => {
        setNewReview({
            ...newReview,
            [event.currentTarget.name]: event.currentTarget.value
        })
    }
    


    const handleSubmit = (event) => {
        event.preventDefault()
        if (currentUser) {
            addNewReview(newReview)
        }
    }

    const clearForm = () => {
        setNewReview({
            textBody: "",
            rating: ""
        })
    }

    return (
        <div className="callout review-form">
            <h1>
                Review Form
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
                    Rating:
                    <div>
                          <RatingOptions  handleInputChange={handleInputChange}/>
                    </div>
                </label>

                <div className="button-group">
                    <Link to="/" className="button">
                        Back To List
                    </Link>
                    <input className="button" type="button" value="Clear Review Form" onClick={clearForm} />
                    <input className="button" type="submit" value="Submit Review" />
                </div>
            </form>
        </div>
    )
}

export default ReviewForm