import React from "react";
import { Link } from "react-router-dom";

const SiteTile = ({ name, address, description, setting, minimumAge, yearEstablished, id }) => {
    return (
        <li>
            <Link to={`/${id}`}>
                <h2>{name}</h2>
            </Link>
            <h3>Est: {yearEstablished}</h3>
            <p>Location: {address}</p>
            <p>{description}</p>
            <p>Setting: {setting}</p>
            <p>Minimum Age: {minimumAge}</p>
        </li>
    );
};

export default SiteTile;
