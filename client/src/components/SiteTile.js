import React from "react";
import { Link } from "react-router-dom";

const SiteTile = ({ name, address, description, setting, minimumAge, id }) => {
    let settingText = ""
    if (setting) {
        settingText = `Setting: ${setting}`
    }

    return (
        <li>
            <Link to={`/${id}`}>
                <h2>{name}</h2>
            </Link>
            <h3>{address}</h3>
            <p>{description}</p>
            <p>{settingText}</p>
            <p>Minimum Age: {minimumAge}</p>
        </li>
    );
};

export default SiteTile;
