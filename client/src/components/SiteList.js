import React, { useEffect, useState } from "react";
import SiteTile from "./SiteTile";
import { Link } from "react-router-dom";

const SiteList = props => {
    const [siteList, setSiteList] = useState([])

    const getSites = async () => {
        try {
            const response = await fetch("/api/v1/sites")
            if (!response.ok) {
                const errorMessage = `${response.status} (${response.statusText})`
                const error = new Error(errorMessage)
                throw(error) 
            }
            const responseBody = await response.json()
            setSiteList(responseBody.siteList)
        } catch (error) {
            console.error(`Error in Fetch: ${error.message}`)
        }
    }

    useEffect(() => {
        getSites()
    }, [])

    const sitesToRender = siteList.map(site => {
        return(
            <li key={site.id}>
                <SiteTile
                    key={site.id}
                    name={site.name}
                    address={site.address}
                    description={site.description}
                    environment={site.environment}
                    minimumAge={site.minimumAge}
                />
            </li>
        )
    })

    return(
        <>
            <h1>Welcome to Boston!</h1>
            <Link to="/new-site" />
            <h2></h2>
            <ul>
                {sitesToRender}
            </ul>
        </>
    )
}

export default SiteList