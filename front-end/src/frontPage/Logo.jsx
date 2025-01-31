import React from "react";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <div className="logo">
      <Link to="">
        <img src="/images/logo.png" alt="logo" loading="lazy" className="img" />
      </Link>
    </div>
  );
};

export default Logo;
