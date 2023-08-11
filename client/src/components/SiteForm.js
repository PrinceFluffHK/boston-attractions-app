import React, { useState } from "react";
import translateServerErrors from "../services/translateServerErrors.js";
import { Redirect } from "react-router-dom";
import ErrorList from "./layout/ErrorList";
import Dropzone from "react-dropzone";

const SiteForm = (props) => {
    const [siteRecord, setSiteRecord] = useState({
        name: "",
        address: "",
        description: "",
        setting: "",
        minimumAge: 0,
        image: "",
        yearEstablished: "",
    });
    const [errors, setErrors] = useState([]);
    const [shouldRedirect, setShouldRedirect] = useState(false);

    const addNewSite = async (event) => {
        const siteFormData = new FormData();
        siteFormData.append("name", siteRecord.name);
        siteFormData.append("address", siteRecord.address);
        siteFormData.append("description", siteRecord.description);
        siteFormData.append("setting", siteRecord.setting);
        siteFormData.append("minimumAge", siteRecord.minimumAge);
        siteFormData.append("yearEstablished", siteRecord.yearEstablished);
        siteFormData.append("image", siteRecord.image);

        try {
            const response = await fetch("/api/v1/sites", {
                method: "POST",
                headers: {
                    Accept: "image/jpeg",
                },
                body: siteFormData,
            });
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
        } catch (error) {
            console.error(`Error in fetch: ${error.message}`);
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
        <div className="parchment ">
            <div className="container">
                <div className="container__row">
                    <div>
                        <form onSubmit={handleSubmit}>
                            <h2>Add New Historic Site</h2>
                            <ErrorList errors={errors} />
                            <label htmlFor="name">
                                <h4>
                                    Site Name
                                </h4>
                                <input
                                    id="name"
                                    type="text"
                                    name="name"
                                    onChange={handleChange}
                                    value={siteRecord.name}
                                />
                            </label>
                            <label htmlFor="yearEstablished">
                                <h4>
                                    Year Established
                                </h4>
                                <input
                                    id="yearEstablished"
                                    type="text"
                                    name="yearEstablished"
                                    onChange={handleChange}
                                    value={siteRecord.yearEstablished}
                                />
                            </label>
                            <label htmlFor="address">
                                <h4>
                                    Site Address
                                </h4>
                                <input
                                    id="address"
                                    type="text"
                                    name="address"
                                    onChange={handleChange}
                                    value={siteRecord.address}
                                />
                            </label>
                            <label htmlFor="description">
                                <h4>
                                    Site Description
                                </h4>
                                <input
                                    id="description"
                                    type="text"
                                    name="description"
                                    onChange={handleChange}
                                    value={siteRecord.description}
                                />
                            </label>
                            <label htmlFor="setting">
                                <h4>
                                    Select Setting
                                </h4>
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
                                <h4>
                                    Minimum Age (optional)
                                </h4>
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
                                            <p className="button">Add Picture (optional)</p>
                                        </div>
                                    </section>
                                )}
                            </Dropzone>
                            <input type="submit" value="Add Site" className="button" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SiteForm;
