import React from "react";
import Links from "./Links";
import Reserver from "./Reserver";
import Logo from "./Logo";

const Navbar = () => {
  return (
    <div className="fixed flex items-center justify-between w-full h-16 px-5 p-14 bg-[rgb(245,240,234)] shadow-md z-50 ">
      <Links />
      <Logo />
      <Reserver />
    </div>
  );
};

export default Navbar;
