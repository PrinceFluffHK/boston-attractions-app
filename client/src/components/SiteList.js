import React, { useEffect, useState } from "react";
import SiteTile from "./SiteTile";

const SiteList = (props) => {
    const [siteList, setSiteList] = useState([]);

    const getSites = async () => {
        try {
            const response = await fetch("/api/v1/sites");
            if (!response.ok) {
                const errorMessage = `${response.status} (${response.statusText})`;
                const error = new Error(errorMessage);
                throw error;
            }
            const responseBody = await response.json();
            setSiteList(responseBody.siteList);
        } catch (error) {
            console.error(`Error in Fetch: ${error.message}`);
        }
    };

    useEffect(() => {
        getSites();
    }, []);

    const sitesToRender = siteList.map((site) => {
        return (
            <SiteTile
                key={site.id}
                id={site.id}
                name={site.name}
                address={site.address}
                description={site.description}
                setting={site.setting}
                minimumAge={site.minimumAge}
            />
        );
    });

    return (
        <>
            <h1>Welcome to Boston!</h1>
            <ul>{sitesToRender}</ul>
        </>
    );
};

export default SiteList;
