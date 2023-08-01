import React from "react"

const SiteTile = ({ name, address, description, environment, minimumAge }) => {
    return(
        <>
            <h2>
            {name}
            </h2>

            <h3>
            {address}
            </h3>

            <p>
            {description}
            </p>

            <ul>
            <li>
            Setting: {environment}
            </li>

            <li>
            Minimum Age: {minimumAge}
            </li>
            
            </ul>

        </>
    )
}

export default SiteTile