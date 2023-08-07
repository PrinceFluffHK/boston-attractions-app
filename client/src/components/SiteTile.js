import React from "react";
import { Link } from "react-router-dom";

const SiteTile = ({ name, address, description, setting, minimumAge, id, image }) => {
    return (
        <li>
            <Link to={`/${id}`}>
                <h2>{name}</h2>
            </Link>
            <h3>{address}</h3>
            <p>{description}</p>
            <p>Setting: {setting}</p>
            <p>Minimum Age: {minimumAge}</p>
            <img src={image}/>
        </li>
    );
};

export default SiteTile;
