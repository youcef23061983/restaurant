import { useScroll, useTransform, motion } from "framer-motion";
import React, { useState, useEffect, useRef } from "react";
import testimonialImg from "/images/landingimage/testimonial.jpg";
import Reviews from "./reviews/Reviews";
import { Helmet } from "react-helmet-async";
const Testimonial = () => {
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
    targrt: ref,
    offset: ["0 1", isMediumScreen ? "0.2 0" : "0.1 0"],
  });
  const scrollOpacity = useTransform(scrollYProgress, [0, 1], [0.5, 1]);
  const scrollparagraph = useTransform(scrollYProgress, [0, 1], [-300, 0]);
  const scrollHeader = useTransform(scrollYProgress, [0, 1], [300, 0]);
  return (
    <>
      <Helmet>
        <title>Témoignages</title>
        <meta
          name="description"
          content="Lisez les témoignages de nos clients satisfaits et découvrez pourquoi ils aiment notre restaurant."
        />
        <meta property="og:title" content="Témoignages" />
        <meta
          property="og:description"
          content="Lisez les témoignages de nos clients satisfaits et découvrez pourquoi ils aiment notre restaurant."
        />
        <meta
          property="og:image"
          content="https://elbahjarestaurant.vercel.app/images/landingimage/testimonial.jpg"
        />
        <meta property="og:url" content={window.location.href} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Témoignages" />
        <meta
          name="twitter:description"
          content="Lisez les témoignages de nos clients satisfaits et découvrez pourquoi ils aiment notre restaurant."
        />
        <meta
          name="twitter:image"
          content="https://elbahjarestaurant.vercel.app/images/landingimage/testimonial.jpg"
        />
        <meta name="robots" content="index, follow" />
        <meta
          name="keywords"
          content="témoignages, avis, restaurant, clients"
        />
        <meta name="author" content="Desire" />
      </Helmet>
      <img
        src={testimonialImg}
        alt="testimonialUmg"
        loading="lazy"
        className="landingImg"
      />
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
