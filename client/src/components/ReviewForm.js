import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"

import translateServerErrors from "../services/translateServerErrors.js"

const ReviewForm = (props) => {
console.log("AND I'M THE reviewform's props", props)
    const site = props.site
    const currentUser = props.currentUser
    console.log("PROPS FROM REVIEW FORM", props)

    const [newReview, setNewReview] = useState({
        // siteId: site.id,
        // userId: currentUser.id,
        textBody: "",
        rating: ""
    })
console.log("NEW REVIEW DOT SITE ID", newReview)
    const [errors, setErrors] = useState([])

    const addNewReview = async (formData) => {
        console.log("form data incoming", formData)
        try {
            const response = await fetch(`/api/v1/sites/${site.id}`, {
                method: "POST",
                headers: new Headers({
                    "Content-Type": "application/json",
                }),
                body: JSON.stringify(formData)
            })
            // console.log("RESPONSE", response.body)

            if (!response.ok) {
                if (response.status === 422) {
                    console.log("NEW REVIEW", newReview)
                    console.log("RESPONSEE:", response)
                    const body = await response.json()
                    const newErrors = translateServerErrors(body.errors)
                    return setErrors(newErrors)
                } else {
                    throw(new Error(`${response.status} (${response.statusText})`))
                }
            } else {
                const responseBody = await response.json()
                console.log("Bodyless?", responseBody)
                const reviewData = site.reviews.concat(responseBody.review)
                setErrors([])
                setNewReview({...site, reviews: reviewData, siteId: siteId})
            }
        }catch(error) {
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
        addNewReview()
    }

    const clearForm = () => {
        setNewReview({
            textBody: "",
            rating: ""
        })
    }

    return(
        <div className="callout primary">
            <h1>
                Review Form :D
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
                    Rating:
                    <input
                        id="rating"
                        type="text"
                        name="rating"
                        value={newReview.rating}
                        onChange={handleInputChange}
                    />
                </label>
            <div className="button-group">
                <Link to={`/`} className="button">
                    Back To List
                </Link>
                <input className="button" type="button" value="Clear Review Form" onClick={clearForm}/>
                <input className="button" type="submit" value="Submit Review"/>
            </div>
            </form>
        </div>
    )
}


export default ReviewForm