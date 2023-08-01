import React, { useEffect, useState } from "react";
// import { Site } from "../../"

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
            console.log(responseBody)
            setSiteList(responseBody.siteList)
        } catch (error) {
            // res.status(500).json({ errors: error })
            console.error(`Error in Fetch: ${error.message}`)
        }
    }

    useEffect(() => {
        getSites()
    }, [])

    return(
        <h1>Welcome to Boston!</h1>
        // <div>Hello from SiteList</div>
    )
}

export default SiteList