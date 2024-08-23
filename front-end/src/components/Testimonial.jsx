import { useScroll, useTransform, motion } from "framer-motion";
import React, { useState, useEffect, useRef } from "react";
import testimonialImg from "/images/landingimage/testimonial.jpg";
import Reviews from "./reviews/Reviews";
const Testimonial = () => {
  useEffect(() => {
    document.title = "témoignage";
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
    <>
      <img src={testimonialImg} alt="" className="landingImg" />
      <div ref={ref} className="article">
        <motion.h2
          style={{
            opacity: scrollOpacity,
            x: scrollHeader,
          }}
          className="articleHeader"
        >
          Ce Que Disent Nos Clients{" "}
        </motion.h2>
        <motion.p
          style={{
            opacity: scrollOpacity,
            x: scrollparagraph,
          }}
          className="articleParagraph"
        >
          Chez El Bahja, la satisfaction de nos clients est notre plus grande
          fierté. Découvrez ce que nos visiteurs pensent de leur expérience
          culinaire chez nous. De l'accueil chaleureux à la richesse des saveurs
          algériennes, nos clients partagent leurs moments mémorables passés
          dans notre restaurant. Leur témoignage est la meilleure preuve de
          notre engagement à offrir une expérience authentique et inoubliable
        </motion.p>
      </div>
      <Reviews />
    </>
  );
};

export default Testimonial;
