import React, { useState } from "react";
import { useLocation } from "react-router-dom"

import translateServerErrors from "../services/translateServerErrors.js"

const ReviewForm = (props) => {
    const location = useLocation()
    const siteId = location.pathname[1]
    console.log(props)
    const [reviewRecord, setReviewRecord] = useState({
        siteId: siteId,
        userId: "",
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
            yoyoyo!
        </div>
    )
}


export default ReviewForm