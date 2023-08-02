import React, { useState } from "react";
import translateServerErrors from "../services/translateServerErrors.js"

const SiteForm = (props) => {
    const [siteRecord, setSiteRecord] = useState({
        name: "",
        location: "",
        description: "",
        environment: "",
        minimumAge: ""
    })
    const [errors, setErrors] = useState([])
    const [shouldRedirect, setShouldRedirect] = useState(false)
    const addNewSite = async() => {
        try {
            const response = await fetch("/api/v1/sites", {method: "POST", headers: new Headers({
                "Content-Type": "application/json"
            }),
            body: JSON.stringify(siteRecord)
        })
        if(!response.ok) {
            if(response.status === 422) {
                const body = await response.json()
                const newErrors = translateServerErrors(body.errors)
                return setErrors(newErrors)
            } else {
                const errorMessage = `${response.status} (${response.statusText})`
                const error = new Error(errorMessage)
                throw(error)
            }
        } else{
            const body = await response.json()
            console.log("THE POST WAS SUBMITTED SUCCESSFULLY", body)
            setShouldRedirect(true)
        }
        } catch(error){
            console.error(`Error in fetch: ${error.message}`)
        }
    }
    
        
}

export default SiteForm