import React, { useState } from "react";
import translateServerErrors from "../services/translateServerErrors.js";
import { Redirect } from "react-router-dom";

const SiteForm = (props) => {
    const [siteRecord, setSiteRecord] = useState({
        name: "",
        address: "",
        description: "",
        setting: "",
        minimumAge: 0,
    });
    const [errors, setErrors] = useState([]);
    const [shouldRedirect, setShouldRedirect] = useState(false);
    const addNewSite = async () => {
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
                setShouldRedirect(true);
            }
        } catch (error) {
            console.error(`Error in fetch: ${error.message}`);
        }
    };

    const handleChange = event => {
        setSiteRecord({
            ...siteRecord, 
            [event.currentTarget.name]: event.currentTarget.value
        })
    }

    const handleSubmit = event => {
        event.preventDefault()
        addNewSite()
    }

    if (shouldRedirect) {
        return <Redirect push to="/" />
    }
    
    const settings = ["", "Indoors", "Outdoors", "Indoors and Outdoors"]
    const settingOptions = settings.map(setting => {
        return(
            <option key={setting} value={setting}>
                {setting}
            </option>
        )
    })

    return (
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
                <label htmlFor="minimumAge">
                    Minimum Age (optional) 
                    <input 
                        id="minimumAge"
                        type="integer"
                        name="minimumAge"
                        onChange={handleChange}
                        value={siteRecord.minimumAge}
                    />
                </label>
                <label htmlFor="setting">
                    Select Setting
                    <select
                        id="setting"
                        name="setting"
                        onChange={handleChange}
                        value={siteRecord.setting}
                    >
                        {settingOptions}
                    </select>
                </label>
                <input type="submit" value="Add Site" />
            </form>
        </>

            //image upload (later)
        
    );
};

export default SiteForm;
