import React from "react";
import { useRouteError } from "react-router-dom";
import errorImg from "/images/landingimage/error.jpg";

export default function Error() {
  const error = useRouteError();

  return (
    <div>
      <img src={errorImg} alt="error" loading="lazy" className="landingImg" />
      <div className="article">
        <h2 className="articleHeader">Error: {error.message}</h2>
        <p className="articleParagraph">
          {error.status} - {error.statusText}
        </p>
      </div>
    </div>
  );
}
