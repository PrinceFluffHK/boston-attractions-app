import React, { useState } from "react";
import translateServerErrors from "../services/translateServerErrors.js";
import { Redirect } from "react-router-dom";
import ErrorList from "./layout/ErrorList";
import Dropzone from "react-dropzone";

const SiteForm = (props) => {
    const { user } = props;
    const [siteRecord, setSiteRecord] = useState({
        name: "",
        creatorId: user.id,
        address: "",
        description: "",
        setting: "",
        minimumAge: 0,
        yearEstablished:"",
        image: {},
    });
    const [errors, setErrors] = useState([]);
    const [shouldRedirect, setShouldRedirect] = useState(false);

    const addNewSite = async (event) => {
        const siteFormData = new FormData();
        siteFormData.append("name", siteRecord.name);
        siteFormData.append("creatorId", siteRecord.creatorId);
        siteFormData.append("address", siteRecord.address);
        siteFormData.append("description", siteRecord.description);
        siteFormData.append("setting", siteRecord.setting);
        siteFormData.append("minimumAge", siteRecord.minimumAge);
        siteFormData.append("yearEstablished", siteRecord.minimumAge);
        siteFormData.append("image", siteRecord.image);

        let response;
        try {
            response = await fetch("/api/v1/sites", {
                method: "POST",
                headers: {
                    Accept: "image/jpeg",
                },
                body: siteFormData,
            });
        } catch (error) {
            console.error(`Error in fetch: ${error.message}`);
        }
        if (!response.ok) {
            if (response.status === 422) {
                const body = await response.json();
                const newErrors = translateServerErrors(body.error);
                return setErrors(newErrors);
            } else {
                const errorMessage = `${response.status} (${response.statusText})`;
                const error = new Error(errorMessage);
                throw error;
            }
        } else {
            setShouldRedirect(true);
        }
    };

    const handleChange = (event) => {
        setSiteRecord({
            ...siteRecord,
            [event.currentTarget.name]: event.currentTarget.value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        addNewSite();
    };

    if (shouldRedirect) {
        return <Redirect push to="/" />;
    }

    const settings = ["", "Indoors", "Outdoors", "Indoors and Outdoors"];
    const settingOptions = settings.map((setting) => {
        return (
            <option key={setting} value={setting}>
                {setting}
            </option>
        );
    });

    const handleSiteImageUpload = (acceptedSiteImage) => {
        setSiteRecord({
            ...siteRecord,
            image: acceptedSiteImage[0],
        });
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <h2>Add New Historic Site</h2>
                <ErrorList errors={errors} />
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
                <label htmlFor="yearEstablished">
                    Year Established
                    <input
                        id="yearEstablished"
                        type="text"
                        name="yearEstablished"
                        onChange={handleChange}
                        value={siteRecord.yearEstablished}
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
                <Dropzone onDrop={handleSiteImageUpload}>
                    {({ getRootProps, getInputProps }) => (
                        <section>
                            <div {...getRootProps()}>
                                <input {...getInputProps()} />
                                <p className="button">Upload a Relevant Picture (optional)</p>
                            </div>
                        </section>
                    )}
                </Dropzone>
                <input type="submit" value="Add Site" />
            </form>
        </>
    );
};

export default SiteForm;
