import { useEffect, useState } from "react";
import Links from "./Links";
import Reserver from "./Reserver";
import Logo from "./Logo";

const Navbar = () => {
  const useMediaQuery = (query) => {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
      const media = window.matchMedia(query);
      if (media.matches !== matches) {
        setMatches(media.matches);
      }

      const listener = () => {
        setMatches(media.matches);
      };

      if (typeof media.addEventListener === "function") {
        media.addEventListener("change", listener);
      } else {
        media.addListener(listener);
      }

      return () => {
        if (typeof media.removeEventListener === "function") {
          media.removeEventListener("change", listener);
        } else {
          media.removeListener(listener);
        }
      };
    }, [matches, query]);

    return matches;
  };
  const isMediumScreen = useMediaQuery("(min-width: 768px)");
  return (
    <div className="fixed flex items-center justify-between w-full h-16 px-5 p-14  bg-[rgb(245,240,234)] shadow-md z-50">
      {/* Left side - Links */}
      <div className="flex-1">
        <Links />
      </div>

      {/* Center - Logo (absolute positioned) */}

      <div
        className={
          isMediumScreen
            ? "absolute left-1/2 transform -translate-x-1/2"
            : "flex-1 flex justify-center"
        }
      >
        <Logo />
      </div>

      {/* Right side - Reserver */}
      <div className="flex-1 flex justify-end">
        <Reserver />
      </div>
    </div>
  );
};

export default Navbar;
