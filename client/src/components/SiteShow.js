import React, { useState, useEffect } from "react";
import ReviewTile from "./ReviewTile.js";
import ReviewForm from "./ReviewForm.js";

const SiteShow = (props) => {
    const [site, setSite] = useState({
        name: "",
        address: "",
        description: "",
        setting: "",
        yearEstablished: "",
        minimumAge: 0,
        image: "",
        creatorUsername: "",
    });

    const [reviews, setReviews] = useState([])
    
    const currentUser = props.user;
    const siteId = props.match.params.id;

    const getSite = async () => {
        try {
            const response = await fetch(`/api/v1/sites/${siteId}`);
            if (!response.ok) {
                throw new Error(`${response.status} (${response.statusText})`);
            }
            const body = await response.json();
            setSite(body.site);
            setReviews(body.site.reviews)
        } catch (error) {
            console.error(`Error in Fetch: ${error.message}`);
        }
    };

    useEffect(() => {
        getSite();
    }, []);

    let displayAge = "Open to visitors of all ages";
    if (site.minimumAge > 0) {
        displayAge = `Open to visitors aged ${site.minimumAge}+`;
    }

    const reviewList = reviews.map(reviewObject => {
        return (
            <ReviewTile
                key={reviewObject.id}
                {...reviewObject}
                user={props.user}
            />
        )
    })

    let showReviewForm;
    if(currentUser) {
        showReviewForm =
        <ReviewForm
            site={site}
            user={props.user}
            setSite={setSite}
            setReviews={setReviews}
            reviews={reviews}
        />
    } else {
        showReviewForm = <h4>Please Sign Up, or Sign In, To Contribute A Review To {site.name}</h4>
    }

    return (
        <div className="parchment col1">
            <div className="">
                <h1>{site.name}</h1>
                <h2>Est: {site.yearEstablished}</h2>
                <h3>Location: {site.address}</h3>
                <p>Setting: {site.setting}</p>
                <p>{displayAge}</p>
                <p>{site.description}</p>
                <h6>Contributed by: {site.creatorUsername}</h6>
            </div>
            <div className="callout secondary">
                Reviews:
                {showReviewForm}
                {reviewList}
            </div>
        </div>
    );
};

export default SiteShow;