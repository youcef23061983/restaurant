import { useScroll, useTransform, motion } from "framer-motion";
import React, { useState, useEffect, useRef } from "react";
import reserver from "/images/landingimage/reserver.jpg";

const Reservation = () => {
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
  const { scrollYProgress: scrollYProgress1 } = useScroll({
    ref: ref,
    offset: ["0 1", isMediumScreen ? "0.2 0" : "0.05 0"],
  });
  const scrollOpacity = useTransform(
    scrollYProgress1,
    [0, 0.5, 1],
    [0, 0.3, 1]
  );
  const scrollparagraph = useTransform(scrollYProgress1, [0, 1], [-500, 0]);
  const scrollHeader = useTransform(scrollYProgress1, [0, 1], [500, 0]);

  return (
    <div>
      <img src={reserver} alt="" className="landingImg" />
      <div ref={ref} className="article">
        <motion.h2
          style={{
            opacity: scrollOpacity,
            x: scrollHeader,
          }}
          className="articleHeader"
        >
          Réservez Votre Table
        </motion.h2>
        <motion.p
          style={{
            opacity: scrollOpacity,
            x: scrollparagraph,
          }}
          className="articleParagraph"
        >
          Plongez dans l’ambiance chaleureuse et les saveurs authentiques d'El
          Bahja en réservant votre table dès aujourd'hui. Que ce soit pour une
          soirée intime, un repas en famille, ou une célébration spéciale, nous
          vous garantissons une expérience culinaire inoubliable. Pour assurer
          votre confort et vous offrir le meilleur service possible, nous vous
          recommandons de réserver à l'avance. Faites votre réservation en ligne
          ou par téléphone, et laissez-nous vous transporter au cœur de la
          tradition culinaire algérienne.
        </motion.p>
      </div>
    </div>
  );
};

export default Reservation;
