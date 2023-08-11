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
    const siteId = props.match.params.id;

    const getSite = async () => {
        try {
            const response = await fetch(`/api/v1/sites/${siteId}`);
            if (!response.ok) {
                throw new Error(`${response.status} (${response.statusText})`);
            }
            const body = await response.json();
            setSite(body.site);
            setReviews([])
            setReviews(body.site.reviews)
        } catch (error) {
            console.error(`Error in Fetch: ${error.message}`);
        }
    };

    const setReviewHandler = (targetId, value) => {
        const modReviews = reviews.map((review) => {
            if (review.id === targetId) {
                review.netVoteValue = review.netVoteValue + value;
                review.hasVoted = true
            }
            return review;
        });
        setReviews(modReviews);
    }

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
                deleteReview={deleteReview}
                setReviewHandler={setReviewHandler}
            />
        )
    })

    let showReviewForm;
    if (currentUser) {
        showReviewForm =
        <ReviewForm
            site={site}
            user={props.user}
            setSite={setSite}
            setReviews={setReviews}
            reviews={reviews}
        />
    } else {
        showReviewForm = <h4>Please Sign Up or Sign In to contribute a review</h4>
    }

    let yearEstablished = `Est: ${site.yearEstablished}`
    if (site.yearEstablished === 0) {
        yearEstablished = ""
    }
    return (
        <div className="parchment">
            <h1>{site.name}</h1>
            <div className="container__row">
                <div className="container__col-md-5">
                    <img src={site.image} alt={site.description} className="image-border"/>
                    <h2>{yearEstablished}</h2>
                    <h3>Address: {site.address}</h3>
                    <h3>Setting: {site.setting}</h3>
                    <h3>{displayAge}</h3>
                    <p>{site.description}</p>
                    <p className="small-gray">Contributed by: {site.creatorUsername}</p >
                </div>
                <div className="callout secondary container__col-md-6 align-right container__col-offset-1">
                    {showReviewForm}
                    {reviewList}
                </div>
            </div>
        </div>
    );
};
export default SiteShow;