import { useScroll, useTransform, motion } from "framer-motion";
import React, { useState, useEffect, useRef } from "react";
import ordre from "/images/landingimage/ordre.png";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const Ordre = () => {
  const useMediaQuery = (query) => {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
      document.title = "Ordre";
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
    offset: ["0 1", isMediumScreen ? "0.2 0" : "0.1 0"],
  });
  const scrollOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.3, 1]);
  const scrollparagraph = useTransform(scrollYProgress, [0, 1], [-500, 0]);
  const scrollHeader = useTransform(scrollYProgress, [0, 1], [500, 0]);
  return (
    <div>
      <Helmet>
        <title>Ordre</title>
        <meta
          name="description"
          content="Passez votre commande et profitez de nos délicieux repas."
        />
        <meta property="og:title" content="Ordre" />
        <meta
          property="og:description"
          content="Passez votre commande et profitez de nos délicieux repas."
        />
        <meta
          property="og:image"
          content="https://elbahjarestaurant.vercel.app/images/landingimage/ordre.png"
        />
        <meta property="og:url" content={window.location.href} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Ordre" />
        <meta
          name="twitter:description"
          content="Passez votre commande et profitez de nos délicieux repas."
        />
        <meta
          name="twitter:image"
          content="https://elbahjarestaurant.vercel.app/images/landingimage/ordre.png"
        />
        <meta name="robots" content="index, follow" />
        <meta
          name="keywords"
          content="commande, nourriture, restaurant, repas"
        />
        <meta name="author" content="el bahja" />
      </Helmet>
      <img src={ordre} alt="orderImg" loading="lazy" className="landingImg" />
      <div ref={ref} className="article">
        <motion.h2
          style={{
            opacity: scrollOpacity,
            x: scrollHeader,
          }}
          className="articleHeader"
        >
          {" "}
          Commandez Vos Plats Traditionnels Algériens
        </motion.h2>
        <motion.p
          style={{
            opacity: scrollOpacity,
            x: scrollparagraph,
          }}
          className="articleParagraph"
        >
          Découvrez les saveurs authentiques de l'Algérie directement chez vous.
          Choisissez parmi notre sélection de plats traditionnels préparés avec
          soin et passion. Que ce soit pour un repas en famille ou une soirée
          entre amis, nos délices algériens sauront ravir vos papilles. Passez
          votre commande en ligne et laissez-nous vous apporter un morceau de
          l'Algérie à votre table,Vous pouvez appeler directement le restaurant
          au (213) 00/00/00/00
        </motion.p>
        <Link className="typeBtn" to="/menu">
          Passez Votre Commande à Partir du Menu{" "}
        </Link>
      </div>
    </div>
  );
};

export default Ordre;
