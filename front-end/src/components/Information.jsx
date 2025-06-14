import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../data/AppProvider";
import infoImg from "/images/landingimage/information.jpg";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Information = () => {
  const { cartInformation, information } = useContext(AppContext);

  useEffect(() => {
    document.title = "client information";
  }, []);

  const navigate = useNavigate();

  const informationSubmit = (e) => {
    e.preventDefault();
    if (
      !information.fullName ||
      !information.address ||
      !information.city ||
      !information.postalCode ||
      !information.country
    ) {
      alert("Please enter your information");
      return;
    }

    navigate("/payment");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    cartInformation({ ...information, [name]: value });
  };

  const containerVariants = {
    hidden: { x: "100vw", opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 2,
        type: "spring",
        stiffness: 50,
        when: "beforeChildren",
        staggerChildren: 1,
      },
    },
    exit: {
      x: "-100vw",
      transition: { ease: "easeInOut" },
    },
  };

  const childVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1, ease: "easeInOut" } },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div variants={childVariants}>
        <img
          src={infoImg}
          alt="informationImg"
          loading="lazy"
          className="landingImg"
        />
      </motion.div>
      <motion.div className="loginContainer" variants={containerVariants}>
        <h2 className="articleHeader">Client Information</h2>
        <form onSubmit={informationSubmit}>
          <label>
            Nom et Prenom:
            <input
              type="text"
              name="fullName"
              value={information.fullName}
              onChange={handleChange}
              className="input"
            />
          </label>
          <br />
          <label>
            Adresse:
            <input
              type="text"
              name="address"
              value={information.address}
              onChange={handleChange}
              className="input"
            />
          </label>
          <br />
          <label>
            Ville:
            <input
              type="text"
              name="city"
              value={information.city}
              onChange={handleChange}
              className="input"
            />
          </label>
          <br />
          <label>
            Code postal:
            <input
              type="text"
              name="postalCode"
              value={information.postalCode}
              onChange={handleChange}
              className="input"
            />
          </label>
          <br />
          <label>
            Pays:
            <input
              type="text"
              name="country"
              value={information.country}
              onChange={handleChange}
              className="input"
            />
          </label>
          <br />
          <button type="submit" className="linkmenu">
            Continuez
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default Information;
