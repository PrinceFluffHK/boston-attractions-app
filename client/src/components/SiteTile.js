import React from "react";
import { Link } from "react-router-dom";

const SiteTile = ({ name, address, description, setting, minimumAge, id, image }) => {
    return (
        <li>
            <Link to={`/sites/${id}`}>
                <h2>{name}</h2>
            </Link>
            <p>Setting: {setting}</p>
            <p>Minimum Age: {minimumAge}</p>
            <img src={image}/>
        </li>
    );
};

export default SiteTile;
