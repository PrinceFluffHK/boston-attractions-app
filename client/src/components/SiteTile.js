import React from "react";
import { Link } from "react-router-dom";


const SiteTile = ({ name, yearEstablished, id, image }) => {
    let established = `Est: ${yearEstablished}`
    if (yearEstablished === 0) {
        established = ""
    }
    return (
        <Link to={`/sites/${id}`}>
            <div className="callout container__row full-span">
                <div className="container__col-md-8">
                    <div className="container__row">
                            <h2 className="container__col-md-8">{name}</h2>
                            <h4 className="container__col-md-4">{established}</h4>
                    </div>
                </div>
                <div className="container__col-md-4">
                    <img src={image} className="imageCircle"/>
                </div>
            </div>
        </Link>
    );
};

export default SiteTile;
