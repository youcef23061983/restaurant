import React from "react";
import loc from "/images/landingimage/location.jpg";

const Location = () => {
  useEffect(() => {
    document.title = "Location";
  }, []);
  return (
    <div>
      <img src={loc} className="landingImg" />
    </div>
  );
};

export default Location;
