import React from "react";
import { Link, NavLink } from "react-router-dom";
import {
  FaSquareInstagram,
  FaSquareFacebook,
  FaYoutube,
} from "react-icons/fa6";

const Footer = () => {
  return (
    <>
      <div className="footer">
        <div className="footerlogo">
          <Link to="/">
            <img
              src="/images/footerlogo.png"
              alt="footer"
              loading="lazy"
              className="img"
            />
          </Link>
          <span className="footerspan">EL BAHJA</span>
        </div>
        <div className="footerdiv">
          <h3>Explorez</h3>
          <NavLink
            style={({ isActive }) => {
              return { color: isActive ? "rgb(212, 122, 59)" : "grey" };
            }}
            className="footerlink"
            to="about"
          >
            À propos de nous{" "}
          </NavLink>
          <NavLink
            style={({ isActive }) => {
              return { color: isActive ? "rgb(212, 122, 59)" : "grey" };
            }}
            className="footerlink"
            to="gallery"
          >
            Galerie
          </NavLink>
          <NavLink
            style={({ isActive }) => {
              return { color: isActive ? "rgb(212, 122, 59)" : "grey" };
            }}
            className="footerlink"
            to="testimonial"
          >
            Avis des clients
          </NavLink>
        </div>
        <div className="footerdiv">
          <h3>Contactez-nous</h3>
          <p className="footerlink">Adresse:-------------------</p>
          <p className="footerlink">
            Email:
            <a href="">+00 00 00 00</a>
          </p>

          <NavLink
            style={({ isActive }) => {
              return { color: isActive ? "rgb(212, 122, 59)" : "grey" };
            }}
            className="footerlink"
            to="google"
          >
            googleMaps
          </NavLink>
        </div>
        <div className="footerdiv">
          <h3>Suivez-nous</h3>
          <Link className="hover:text-pink-600  footericon">
            <FaSquareInstagram />
          </Link>
          <Link className=" hover:text-blue-600 footericon">
            <FaSquareFacebook />
          </Link>
          <Link className=" hover:text-red-600 footericon">
            <FaYoutube />
          </Link>
        </div>
      </div>
      <p className="footerReserved" style={{ margin: "1rem" }}>
        © 2024 Restaurant El Bahja Tous droits réservés
      </p>
    </>
  );
};

export default Footer;
