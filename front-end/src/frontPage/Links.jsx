import React, { useEffect, useState } from "react";
import { MotionConfig, motion } from "framer-motion";
import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import Example from "./Example";

const Links = () => {
  return (
    <div>
      <AnimatedHamburgerButton />
    </div>
  );
};

const AnimatedHamburgerButton = () => {
  const [active, setActive] = useState(false);
  const location = useLocation();

  const handleButtonClick = () => {
    setActive((pv) => !pv);
  };
  useEffect(() => {
    setActive(false);
  }, [location]);

  return (
    <MotionConfig
      transition={{
        duration: 0.5,
        ease: "easeInOut",
      }}
    >
      <motion.div
        initial={false}
        animate={active ? "expanded" : "collapsed"}
        variants={CONTAINER_VARIANTS}
        className="absolute top-0 left-0 z-10 flex flex-col items-center justify-center bg-[rgb(245,240,234)] mx-auto mt-4"
      >
        <motion.button
          onClick={handleButtonClick}
          className="absolute top-0 left-0 z-20 h-20 w-20 rounded-full bg-white/0 transition-colors hover:bg-white/20"
        >
          <motion.span
            variants={VARIANTS.top}
            className="absolute h-1 w-10 bg-black"
            style={{ y: "-50%", left: "50%", x: "-50%", top: "35%" }}
          />
          <motion.span
            variants={VARIANTS.middle}
            className="absolute h-1 w-10 bg-black"
            style={{ left: "50%", x: "-50%", top: "50%", y: "-50%" }}
          />
          <motion.span
            variants={VARIANTS.bottom}
            className="absolute h-1 w-5 bg-black"
            style={{
              x: "-50%",
              y: "50%",
              bottom: "35%",
              left: "calc(50% + 10px)",
            }}
          />
        </motion.button>

        <motion.ul
          initial="collapsed"
          animate={active ? "expanded" : "collapsed"}
          variants={MENU_VARIANTS}
          className="flex flex-col items-center space-y-4 text-lg"
        >
          <motion.li className="cursor-pointer">
            <Link to="menu">
              <Example name="MENU" />
            </Link>
          </motion.li>

          <motion.li className="cursor-pointer">
            <Link to="contact">
              <Example name="CONTACTER" />
            </Link>
          </motion.li>
          <motion.li className="cursor-pointer">
            <Link to="location">
              <Example name="LOCATION &  HORAIRE" />
            </Link>
          </motion.li>
          <motion.li className="cursor-pointer">
            <Link to="ordre">
              <Example name="ORDRE" />
            </Link>
          </motion.li>
        </motion.ul>

        {/* Social Media Icons */}
        {active && (
          <div className="absolute bottom-8 left-8 flex space-x-4 text-3xl text-black">
            <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
              <FaFacebookF className="hover:text-blue-600 transition-colors" />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noreferrer"
            >
              <FaInstagram className="hover:text-pink-600 transition-colors" />
            </a>
            <a href="https://www.tiktok.com" target="_blank" rel="noreferrer">
              <FaTiktok className="hover:text-black transition-colors" />
            </a>
          </div>
        )}
      </motion.div>
    </MotionConfig>
  );
};

const VARIANTS = {
  top: {
    expanded: {
      rotate: ["0deg", "0deg", "45deg"],
      top: ["35%", "50%", "50%"],
    },
    collapsed: {
      rotate: ["45deg", "0deg", "0deg"],
      top: ["50%", "50%", "35%"],
    },
  },
  middle: {
    expanded: {
      rotate: ["0deg", "0deg", "-45deg"],
    },
    collapsed: {
      rotate: ["-45deg", "0deg", "0deg"],
    },
  },
  bottom: {
    expanded: {
      rotate: ["0deg", "0deg", "45deg"],
      bottom: ["35%", "50%", "50%"],
      left: "50%",
    },
    collapsed: {
      rotate: ["45deg", "0deg", "0deg"],
      bottom: ["50%", "50%", "35%"],
      left: "calc(50% + 10px)",
    },
  },
};

const CONTAINER_VARIANTS = {
  expanded: {
    width: "100vw",
    height: "100vh",
  },
  collapsed: {
    width: "auto",
    height: "auto",
  },
};

const MENU_VARIANTS = {
  expanded: {
    opacity: 1,
    display: "flex",
  },
  collapsed: {
    opacity: 0,
    display: "none",
  },
};
export default Links;
