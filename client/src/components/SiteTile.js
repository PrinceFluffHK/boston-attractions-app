import React from "react";
import { Link } from "react-router-dom";


const SiteTile = ({ name, setting, minimumAge, yearEstablished, id, image }) => {
    let established = yearEstablished
    if (yearEstablished === 0) {
        established = "Unspecified"
    }
    return (
        <div className="callout container">
            <div className="container__md_4 align-right">
                <Link to={`/sites/${id}`}>
                    <h1>{name}</h1>
                <h3 className="pClass">Est: {established}</h3>
                <img src={image} className="imageCircle"/>
                </Link>
            </div>
        </div>
    );
};

export default SiteTile;
