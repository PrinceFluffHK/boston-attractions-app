import React from "react";
import { Link } from "react-router-dom";


const SiteTile = ({ name, setting, minimumAge, yearEstablished, id, image }) => {
    let established = yearEstablished
    if (yearEstablished === 0) {
        established = "Unspecified"
    }
    return (
        <li>
            <Link to={`/sites/${id}`}>
                <h2>{name}</h2>
            </Link>
            <h3>Est: {established}</h3>
            <p>Setting: {setting}</p>
            <p>Minimum Age: {minimumAge}</p>
            <img src={image}/>
        </li>
    );
};

export default SiteTile;
