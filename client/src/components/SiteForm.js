import React, { useState } from "react";
import translateServerErrors from "../services/translateServerErrors.js";
import { Redirect } from "react-router-dom";

const SiteForm = (props) => {
    const [siteRecord, setSiteRecord] = useState({
        name: "Launch Academy",
        address: "71 Summer St",
        description: "Very cool :)",
        setting: "",
        minimumAge: "",
    });
    const [errors, setErrors] = useState([]);
    const [shouldRedirect, setShouldRedirect] = useState(false);
    const addNewSite = async () => {
        console.log("hello from addNewSite")
        try {
            const response = await fetch("/api/v1/sites", {
                method: "POST",
                headers: new Headers({
                    "Content-Type": "application/json",
                }),
                body: JSON.stringify(siteRecord),
            });
            if (!response.ok) {
                if (response.status === 422) {
                    const body = await response.json();
                    const newErrors = translateServerErrors(body.errors);
                    return setErrors(newErrors);
                } else {
                    const errorMessage = `${response.status} (${response.statusText})`;
                    const error = new Error(errorMessage);
                    throw error;
                }
            } else {
                const body = await response.json();
                console.log("THE POST WAS SUBMITTED SUCCESSFULLY", body);
                setShouldRedirect(true);
            }
        } catch (error) {
            console.error(`Error in fetch: ${error.message}`);
        }
    };

    const handleChange = event => {
        // const targetInput = event.currentTarget
        // let value
        setSiteRecord({
            ...siteRecord, 
            [event.currentTarget.name]: event.currentTarget.value
        })
    }

    const handleSubmit = event => {
        event.preventDefault()
        console.log("hi from handleSubmit")
        addNewSite()
    }

    // console.log(shouldRedirect)
    if (shouldRedirect) {
        return <Redirect push to="/" />
    }

    return (
        //add errorList
        <>
            <form onSubmit={handleSubmit}>
                <h2>Add New Historical Site</h2>
                <label htmlFor="name">
                    Site Name
                    <input 
                        id="name"
                        type="text"
                        name="name"
                        onChange={handleChange}
                        value={siteRecord.name}
                    />
                </label>
                <label htmlFor="address">
                    Site Address
                    <input 
                        id="address"
                        type="text"
                        name="address"
                        onChange={handleChange}
                        value={siteRecord.address}
                    />
                </label>
                <label htmlFor="description">
                    Site Description
                    <input 
                        id="description"
                        type="text"
                        name="description"
                        onChange={handleChange}
                        value={siteRecord.description}
                    />
                </label>
                <input type="submit" value="Add Site" />
            </form>
        </>
            //name
            //location
            //description
            //setting
            //minimumAge
            //image upload (later)
        
    );
};

export default SiteForm;
