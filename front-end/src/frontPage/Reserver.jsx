import React from "react";
import { Link } from "react-router-dom";
import Example from "./Example";

const Reserver = () => {
  return (
    <Link to="reserver" className="m-2.5 p-2.5">
      <Example name="RESERVEZ" />
    </Link>
  );
};

export default Reserver;
