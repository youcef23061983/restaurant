import contact from "/images/landingimage/contact.jpg";
import emailjs from "@emailjs/browser";
import { useScroll, useTransform, motion } from "framer-motion";
import React, { useState, useRef } from "react";
import { Helmet } from "react-helmet-async";

const Contact = () => {
  const [formStatus, setFormStatus] = useState(null);
  const form = useRef();
  const [user, setUser] = useState({ name: "", email: "", comment: "" });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const sendEmail = (e) => {
    e.preventDefault();

    // Validation check
    if (!user.name || !user.email || !user.comment) {
      alert("Please enter your information");
      return; // Return early to prevent further execution
    }

    emailjs
      .sendForm("service_vgkozvc", "template_sv5btsr", form.current, {
        publicKey: import.meta.env.VITE_CONTACT_PUBLIC_KEY,
      })
      .then(
        () => {
          setFormStatus("Message sent successfully!");
          setUser({ name: "", email: "", comment: "" });
          setTimeout(() => {
            setFormStatus(null);
          }, 5000);
        },
        (error) => {
          setFormStatus(`Failed to send message: ${error.text}`);
        }
      );
  };

  const ref = useRef();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "-0.2 0"],
  });
  const scrollOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.3, 1]);
  const scrollparagraph = useTransform(scrollYProgress, [0, 1], [-300, 0]);
  const scrollHeader = useTransform(scrollYProgress, [0, 1], [300, 0]);
  return (
    <div>
      <Helmet>
        <title>Contactez-Nous</title>
        <meta
          name="description"
          content="Contactez-nous pour toute demande de renseignements ou réservation."
        />
        <meta property="og:title" content="Contactez-Nous" />
        <meta
          property="og:description"
          content="Contactez-nous pour toute demande de renseignements ou réservation."
        />
        <meta property="og:image" content={contact} />
        <meta property="og:url" content={window.location.href} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contactez-Nous" />
        <meta
          name="twitter:description"
          content="Contactez-nous pour toute demande de renseignements ou réservation."
        />
        <meta name="twitter:image" content={contact} />
        <meta name="robots" content="index, follow" />
        <meta name="keywords" content="contact, demandes, réservations" />
        <meta name="author" content="el bahja" />
      </Helmet>
      <img src={contact} alt="contact" loading="lazy" className="landingImg" />
      <div ref={ref} className="article">
        <motion.h2
          style={{
            opacity: scrollOpacity,
            x: scrollHeader,
          }}
          className="articleHeader"
        >
          Contactez-Nous
        </motion.h2>
        <motion.p
          style={{
            opacity: scrollOpacity,
            x: scrollparagraph,
          }}
          className="articleParagraph"
        >
          Nous serions ravis de vous accueillir chez El Bahja, où vous pourrez
          découvrir les saveurs authentiques de la cuisine algérienne. Pour
          toute question, réservation ou information supplémentaire, n'hésitez
          pas à nous contacter. Notre équipe est à votre disposition pour
          répondre à toutes vos demandes et rendre votre expérience culinaire
          inoubliable. Vous pouvez nous joindre par téléphone, e-mail ou en
          visitant notre restaurant. Nous avons hâte de vous servir et de
          partager avec vous les délices de notre tradition gastronomique.
        </motion.p>
      </div>
      <div className="form">
        <div className="touches">
          <h2 className="articleHeader mb-32">nos informations</h2>

          <p>
            <span className="mealSpan">adresse:</span>
            ------
          </p>
          <p>
            <span className="mealSpan">téléphone:</span>
            (213) ------
          </p>
          <p>
            <span className="mealSpan">Email:</span>
            ------@--.com
          </p>
        </div>
        <div className="loginContainer">
          <form ref={form} onSubmit={sendEmail}>
            <label htmlFor="name">
              Nom et Prénom:
              <input
                type="text"
                name="name"
                id="name"
                value={user.name}
                onChange={handleChange}
                className="input"
              />
            </label>
            <br />

            <label htmlFor="email">
              Votre Email:
              <input
                type="email"
                name="email"
                id="email"
                value={user.email}
                onChange={handleChange}
                className="input"
              />
            </label>
            <br />
            <label htmlFor="comment">
              votre commentaire:
              <textarea
                name="comment"
                id="comment"
                value={user.comment}
                onChange={handleChange}
                style={{ height: "20rem" }}
                className="input"
              />
            </label>
            <br />

            <button onClick="submit" className="linkmenu">
              soumettre:
            </button>
          </form>
          {formStatus && (
            <div className="formStatusMessage" style={{ marginTop: "-1rem" }}>
              {formStatus}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
