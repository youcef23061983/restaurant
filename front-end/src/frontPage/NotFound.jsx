import React from "react";
import notfound from "/images/landingimage/notfound.jpg";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div>
      <img src={notfound} alt="" className="landingImg" />
      <div className="article">
        <h2 className="articleHeader">Error: This page has not been found</h2>
        <Link className="link-btn" to="">
          Retour à la page d'accueil
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
