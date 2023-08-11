import React, { useState, useEffect } from "react";
import ReviewTile from "./ReviewTile.js";
import ReviewForm from "./ReviewForm.js";

const SiteShow = (props) => {
    const [site, setSite] = useState({
        name: "",
        address: "",
        description: "",
        setting: "",
        minimumAge: 0,
        image: "",
        creatorUsername: "",
    });
    const [reviews, setReviews] = useState([])
    const deleteReview = async (reviewId) => {
        try {
            const response = await fetch(`/api/v1/reviews/${reviewId}`, {
                method: "DELETE",
                headers: {
                    Accept: "application/json",
                },
            })
            if (!response.ok) {
                const error = new Error(`${response.status} ${response.statusText}`)
                throw error
            }
            const updatedReviews = reviews.filter(review => review.id !== reviewId);
            setReviews(updatedReviews);
        }
        catch (error) {
            console.error(`Error in Fetch: ${error.message}`);
        }
    }
    const currentUser = props.user;
    const siteIdFromProps = props.match.params.id;

    const getSite = async () => {
        try {
            const response = await fetch(`/api/v1/sites/${siteIdFromProps}`);
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
    const reviewTiles = reviews.map((reviewObject) => {
        return <ReviewTile key={reviewObject.id} {...reviewObject} deleteReview={deleteReview} user={props.user} />;
    });
    let showReviewForm;
    if (currentUser) {
        showReviewForm =
            <ReviewForm
                site={site}
                currentUser={currentUser}
                setSite={setSite}
            />
    } else {
        showReviewForm = <h4>Please Sign Up, or Sign In, To Contribute A Review To {site.name}</h4>
    }
    return (
        <div className="callout">
            <h1>{site.name}</h1>
            <h3>{site.address}</h3>
            <p>{site.description}</p>
            <p>{site.setting}</p>
            <p>{displayAge}</p>
            <div className="callout secondary">
                {" "}
                Reviews:
                {showReviewForm}
                {reviewTiles}
            </div>
            <h6>Contributed by: {site.creatorUsername}</h6>
        </div>
    );
};
export default SiteShow;