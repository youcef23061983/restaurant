import googleImg from "/images/landingimage/google.jpg";
import { useScroll, useTransform, motion } from "framer-motion";
import React, { useState, useEffect, useRef } from "react";

const Google = () => {
  useEffect(() => {
    document.title = "Google";
  }, []);

  const ref = useRef();
  const { scrollYProgress: scrollYProgress1 } = useScroll({
    target: ref,
    offset: ["0 1", "-0.2 0"],
  });
  const scrollOpacity = useTransform(scrollYProgress1, [0, 1], [0.5, 1]);
  const scrollparagraph = useTransform(scrollYProgress1, [0, 1], [-500, 0]);
  const scrollHeader = useTransform(scrollYProgress1, [0, 1], [500, 0]);
  return (
    <div>
      <img src={googleImg} className="landingImg" alt="" />
      <div ref={ref} className="article">
        <motion.h2
          style={{
            opacity: scrollOpacity,
            x: scrollHeader,
          }}
          className="articleHeader"
        >
          Découvrez Notre Emplacement
        </motion.h2>
        <motion.p
          style={{
            opacity: scrollOpacity,
            x: scrollparagraph,
          }}
          className="articleParagraph"
        >
          Nichée au cœur de Alger, notre restaurant El Bahja vous invite à un
          voyage culinaire à travers les traditions authentiques de l'Algérie.
          Dans une atmosphère chaleureuse et conviviale, nous vous accueillons
          pour déguster des plats typiques préparés avec soin selon des recettes
          transmises de génération en génération. Que vous soyez en famille,
          entre amis ou en quête de découvertes gastronomiques, notre adresse
          est l'endroit idéal pour savourer l'essence de la cuisine algérienne.
          Venez partager un moment unique et laissez-vous transporter par les
          saveurs de notre terroir.
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
    </div>
  );
};

export default Google;
