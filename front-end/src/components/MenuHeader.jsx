import { useScroll, useTransform, motion } from "framer-motion";
import React, { useRef } from "react";

const MenuHeader = () => {
  const ref = useRef();
  const { scrollYProgress: scrollYProgress1 } = useScroll({
    target: ref,
    offset: ["0 1", "-0.2 0"],
  });
  const scrollOpacity = useTransform(
    scrollYProgress1,
    [0, 0.5, 1],
    [0, 0.3, 1]
  );
  const scrollparagraph = useTransform(scrollYProgress1, [0, 1], [-500, 0]);
  const scrollHeader = useTransform(scrollYProgress1, [0, 1], [500, 0]);
  return (
    <div ref={ref} className="article">
      <motion.h2
        style={{
          opacity: scrollOpacity,
          x: scrollHeader,
        }}
        className="articleHeader"
      >
        Découvrez les Saveurs Authentiques de l'Algérie dans Notre Restaurant
        Traditionnel
      </motion.h2>
      <motion.p
        style={{
          opacity: scrollOpacity,
          x: scrollparagraph,
        }}
        className="articleParagraph"
      >
        Embarquez pour un voyage culinaire qui apporte à votre table les saveurs
        riches et diversifiées de l'Algérie. Notre menu est une célébration de
        la cuisine traditionnelle algérienne, proposant une sélection
        minutieusement choisie de plats mettant en avant l'unique mélange
        d'influences méditerranéennes, berbères et moyen-orientales. Du
        savoureux couscous aux tendres tajines d'agneau, en passant par le thé à
        la menthe rafraîchissant et les pâtisseries sucrées, chaque plat est
        préparé avec les meilleurs ingrédients et un soin exceptionnel.
      </motion.p>
    </div>
  );
};

export default MenuHeader;
