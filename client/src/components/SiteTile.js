import React from "react";
import { Link } from "react-router-dom";


const SiteTile = ({ name, setting, minimumAge, yearEstablished, id, image }) => {
    let established = yearEstablished
    if (yearEstablished === 0) {
        established = "Unspecified"
    }
    return (
        <button className="callout secondary">
        <li className="col1">
            <Link to={`/sites/${id}`}>
                <h1>{name}</h1>
            </Link>
            <h3 className="pClass">Est: {established}</h3>
            <img src={image} className="imageCircle"/>
        </li>
        </button>
    );
};

export default SiteTile;
