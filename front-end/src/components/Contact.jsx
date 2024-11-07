import contact from "/images/landingimage/contact.jpg";
import { useScroll, useTransform, motion } from "framer-motion";
import React, { useState, useEffect, useRef } from "react";

const Contact = () => {
  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_vgkozvc", "template_sv5btsr", form.current, {
        publicKey: import.meta.env.VITE_CONTACT_PUBLIC_KEY,
      })
      .then(
        () => {
          console.log("SUCCESS!");
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );
  };
  useEffect(() => {
    document.title = "Contact";
  }, []);
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

  const ref = useRef();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", isMediumScreen ? "0.2 0" : "0.05 0"],
  });
  const scrollOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.3, 1]);
  const scrollparagraph = useTransform(scrollYProgress, [0, 1], [-300, 0]);
  const scrollHeader = useTransform(scrollYProgress, [0, 1], [300, 0]);
  return (
    <div>
      <img src={contact} alt="" className="landingImg" />
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
              <input type="text" name="name" id="name" className="input" />
            </label>
            <br />

            <label htmlFor="email">
              Votre Email:
              <input type="email" name="email" id="email" className="input" />
            </label>
            <br />
            <label htmlFor="comment">
              votre commentaire:
              <textarea
                name="comment"
                id="comment"
                style={{ height: "20rem" }}
                className="input"
              />
            </label>
            <br />

            <button onClick="submit" className="linkmenu">
              soumettre:
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
