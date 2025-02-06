import { useScroll, useTransform, motion } from "framer-motion";
import React, { useState, useEffect, useRef } from "react";
import loc from "/images/landingimage/location.jpg";
import { Helmet } from "react-helmet-async";

const Location = () => {
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
    ref: ref,
    offset: ["0 1", isMediumScreen ? "0.2 0" : "0.05 0"],
  });
  const scrollOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.3, 1]);
  const scrollparagraph = useTransform(scrollYProgress, [0, 1], [-300, 0]);
  const scrollHeader = useTransform(scrollYProgress, [0, 1], [300, 0]);
  return (
    <>
      <Helmet>
        <title>Notre Emplacement</title>
        <meta
          name="description"
          content="Trouvez l'emplacement de notre restaurant et visitez-nous pour un repas délicieux."
        />
        <meta property="og:title" content="Notre Emplacement" />
        <meta
          property="og:description"
          content="Trouvez l'emplacement de notre restaurant et visitez-nous pour un repas délicieux."
        />
        <meta
          property="og:image"
          content="https://elbahjarestaurant.vercel.app/images/landingimage/location.jpg"
        />
        <meta property="og:url" content={window.location.href} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Notre Emplacement" />
        <meta
          name="twitter:description"
          content="Trouvez l'emplacement de notre restaurant et visitez-nous pour un repas délicieux."
        />
        <meta
          name="twitter:image"
          content="https://elbahjarestaurant.vercel.app/images/landingimage/location.jpg"
        />
        <meta name="robots" content="index, follow" />
        <meta
          name="keywords"
          content="emplacement, restaurant, visite, repas"
        />
        <meta name="author" content="el bahja" />
      </Helmet>

      <img src={loc} className="landingImg" alt="locationImg" loading="lazy" />
      <div ref={ref} className="article">
        <motion.h2
          style={{
            opacity: scrollOpacity,
            x: scrollHeader,
          }}
          className="articleHeader"
        >
          Bienvenue chez El Bahja - Restaurant Traditionnel Algérien
        </motion.h2>
        <motion.p
          style={{
            opacity: scrollOpacity,
            x: scrollparagraph,
          }}
          className="articleParagraph"
        >
          Bienvenue chez El Bahja, votre destination incontournable pour une
          expérience culinaire authentique algérienne. Niché à côté du vieux
          port, notre restaurant vous invite à découvrir une vaste sélection de
          plats traditionnels préparés avec soin et passion. Nous sommes ouverts
          tous les jours de 12h00 à 23h00, vous offrant l’opportunité de
          déguster nos spécialités à tout moment de la journée, sauf le vendredi
          où nous vous accueillons de 14h00 à 23h00 pour un repas en toute
          tranquillité après votre journée de travail. Que vous soyez un amateur
          de la cuisine algérienne ou un nouveau venu désireux d'explorer de
          nouvelles saveurs, El Bahja vous promet une expérience gastronomique
          mémorable dans un cadre chaleureux et accueillant. Venez nous rendre
          visite et laissez-vous séduire par nos délices culinaires !
        </motion.p>
      </div>
      <div className="mapResponsive">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6392.160361019651!2d3.0588920585637567!3d36.76864391215787!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x128fb2f9e3981e53%3A0x8da75429bf565c9e!2sPort%20d&#39;Alger!5e0!3m2!1sfr!2sdz!4v1724353955483!5m2!1sfr!2sdz"
          width="1200"
          height="450"
          title="responsive"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </>
  );
};

export default Location;
