import React from "react";

const SiteTile = ({ name, address, description, setting, minimumAge }) => {
  return (
    <>
      <h2>{name}</h2>
      <h3>{address}</h3>
      <p>{description}</p>
      <ul>
        <li>Setting: {setting}</li>
        <li>Minimum Age: {minimumAge}</li>
      </ul>
    </>
  );
};

export default SiteTile;
