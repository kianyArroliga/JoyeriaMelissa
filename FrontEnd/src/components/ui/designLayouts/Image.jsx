import React from "react";

const Image = ({ imgSrc, alt = "Imagen", className = "" }) => {
  return <img src={imgSrc} alt={alt} className={className} />;
};

export default Image;
