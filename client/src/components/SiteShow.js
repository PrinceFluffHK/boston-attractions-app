import React, { useState, useEffect } from "react";
import ReviewTile from "./ReviewTile.js"

const SiteShow = (props) => {
    const [site, setSite] = useState({
        name: "",
        address: "",
        description: "",
        setting: "",
        minimumAge: 0,
        reviews: []
    });

    const siteId = props.match.params.id;

    const getSite = async () => {
        try {
            const response = await fetch(`/api/v1/sites/${siteId}`);
            if (!response.ok) {
                throw new Error(`${response.status} (${response.statusText})`);
            }
            const body = await response.json();
            setSite(body.site);
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

    const reviews = site.reviews.map(reviewObject => {
        return (
            <ReviewTile
                key={reviewObject.id}
                {...reviewObject}
            />
        )
    })
    return (
        <div className="callout">
            <h1>{site.name}</h1>
            <h3>{site.address}</h3>
            <p>{site.description}</p>
            <p>{site.setting}</p>
            <p>{displayAge}</p>
            <div className="callout secondary"> Reviews:
                {reviews}
            </div>
        </div>
    );
};

export default SiteShow;