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

    return(
        <div>
            <form>
                <label>
                    <input>
                    </input>
                </label>
                <label>
                    <input>
                    </input>
                </label>
            </form>
        </div>
    )
}



export default ReviewForm