import galleryImg from "/images/landingimage/gallery.jpg";
import { twMerge } from "tailwind-merge";
import { useScroll, useTransform, motion } from "framer-motion";
import React, { useState, useEffect, useRef } from "react";
import { useLoaderData } from "react-router-dom";
async function getGallery() {
  const url = `${import.meta.env.VITE_PROD_URL_URL}/gallery`;

  const res = await fetch(url);
  if (!res.ok) {
    throw {
      message: "Failed to fetch menu",
      statusText: res.statusText,
      status: res.status,
    };
  }
  const data = await res.json();
  return data;
}
export const loader = async () => {
  return getGallery();
};

const Gallery = () => {
  useEffect(() => {
    document.title = "Gallerie";
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
    target: ref,
    offset: ["0 1", isMediumScreen ? "0.2 0" : "0.05 0"],
  });
  const scrollOpacity = useTransform(scrollYProgress1, [0, 1], [0.5, 1]);
  const scrollparagraph = useTransform(scrollYProgress1, [0, 1], [-200, 0]);
  const scrollHeader = useTransform(scrollYProgress1, [0, 1], [200, 0]);
  return (
    <>
      <img src={galleryImg} alt="" className="landingImg" />
      <div ref={ref} className="article">
        <motion.h2
          style={{
            opacity: scrollOpacity,
            x: scrollHeader,
          }}
          className="articleHeader"
        >
          Galerie d'El Bahja
        </motion.h2>
        <motion.p
          style={{
            opacity: scrollOpacity,
            x: scrollparagraph,
          }}
          className="articleParagraph"
        >
          Découvrez l'essence de l'Algérie à travers notre galerie. Chaque image
          capture la richesse de notre patrimoine culinaire, où les couleurs
          vibrantes et les saveurs authentiques se mêlent pour créer une
          expérience unique. Laissez-vous transporter par la beauté de nos plats
          traditionnels, soigneusement préparés avec des ingrédients locaux et
          un savoir-faire ancestral. Bienvenue dans le monde savoureux d'El
          Bahja, où chaque moment est un festin pour les yeux et le palais. This
          text highlights the cultural and culinary richness of your restaurant,
          enticing visitors to explore the gallery.
        </motion.p>
      </div>
      <section className="relative grid min-h-screen w-full place-content-center overflow-hidden bg-[rgb(245,240,234)]">
        <h2 className="relative z-0 text-center text-[20vw] font-black text-neutral-800 md:text-[200px]">
          EL BAHJA<span className="text-[#D47A3B]">.</span>
        </h2>

        <Cards isMediumScreen={isMediumScreen} />
      </section>
    </>
  );
};

const Cards = ({ isMediumScreen }) => {
  const pictures = useLoaderData();

  const containerRef = useRef(null);

  return (
    <div className="absolute inset-0 z-10" ref={containerRef}>
      <Card
        isMediumScreen={isMediumScreen}
        containerRef={containerRef}
        src={pictures[0].url}
        alt="Example image"
        rotate="6deg"
        top="2%"
        left="25%"
        className="w-36 md:w-56"
      />
      <Card
        isMediumScreen={isMediumScreen}
        containerRef={containerRef}
        src={pictures[1].url}
        alt="Example image"
        rotate="12deg"
        top="4%"
        left="60%"
        className="w-24 md:w-48"
      />
      <Card
        containerRef={containerRef}
        isMediumScreen={isMediumScreen}
        src={pictures[2].url}
        alt="Example image"
        rotate="-6deg"
        top="0%"
        left="40%"
        className="w-52 md:w-80"
      />
      <Card
        containerRef={containerRef}
        isMediumScreen={isMediumScreen}
        src={pictures[3].url}
        alt="Example image"
        rotate="8deg"
        top="50%"
        left="40%"
        className="w-48 md:w-72"
      />
      <Card
        isMediumScreen={isMediumScreen}
        containerRef={containerRef}
        src={pictures[4].url}
        alt="Example image"
        rotate="18deg"
        top="70%"
        left="75%"
        className="w-40 md:w-64"
      />
      <Card
        containerRef={containerRef}
        isMediumScreen={isMediumScreen}
        src={pictures[5].url}
        alt="Example image"
        rotate="-3deg"
        top="75%"
        left="35%"
        className="w-24 md:w-48"
      />

      <Card
        isMediumScreen={isMediumScreen}
        containerRef={containerRef}
        src={pictures[6].url}
        alt="Example image"
        rotate="8deg"
        top="25%"
        left="23%"
        className="w-36 md:w-56"
      />
      <Card
        isMediumScreen={isMediumScreen}
        containerRef={containerRef}
        src={pictures[7].url}
        alt="Example image"
        rotate="14deg"
        top="47%"
        left="62%"
        className="w-24 md:w-48"
      />
      <Card
        containerRef={containerRef}
        isMediumScreen={isMediumScreen}
        src={pictures[8].url}
        alt="Example image"
        rotate="-8deg"
        top="28%"
        left="43%"
        className="w-52 md:w-80"
      />
      <Card
        containerRef={containerRef}
        isMediumScreen={isMediumScreen}
        src={pictures[9].url}
        alt="Example image"
        rotate="-11deg"
        top="57%"
        left="49%"
        className="w-48 md:w-72"
      />
      <Card
        isMediumScreen={isMediumScreen}
        containerRef={containerRef}
        src={pictures[10].url}
        alt="Example image"
        rotate="22deg"
        top="3%"
        left="78%"
        className="w-40 md:w-64"
      />
      <Card
        containerRef={containerRef}
        isMediumScreen={isMediumScreen}
        src={pictures[11].url}
        alt="Example image"
        rotate="-7deg"
        top="38%"
        left="57%"
        className="w-24 md:w-48"
      />

      <Card
        isMediumScreen={isMediumScreen}
        containerRef={containerRef}
        src={pictures[12].url}
        alt="Example image"
        rotate="11deg"
        top="15%"
        left="15%"
        className="w-24 md:w-48"
      />
      <Card
        containerRef={containerRef}
        isMediumScreen={isMediumScreen}
        src={pictures[13].url}
        alt="Example image"
        rotate="10deg"
        top="1%"
        left="1%"
        className="w-52 md:w-80"
      />
      <Card
        containerRef={containerRef}
        isMediumScreen={isMediumScreen}
        src={pictures[14].url}
        alt="Example image"
        rotate="-11deg"
        top="67%"
        left="9%"
        className="w-48 md:w-72"
      />
      <Card
        isMediumScreen={isMediumScreen}
        containerRef={containerRef}
        src={pictures[15].url}
        alt="Example image"
        rotate="22deg"
        top="53%"
        left="8%"
        className="w-40 md:w-64"
      />
    </div>
  );
};

const Card = ({
  containerRef,
  src,
  alt,
  top,
  left,
  rotate,
  className,
  isMediumScreen,
}) => {
  const [zIndex, setZIndex] = useState(0);

  const updateZIndex = () => {
    const els = document.querySelectorAll(".drag-elements");

    let maxZIndex = -Infinity;

    els.forEach((el) => {
      let zIndex = parseInt(
        window.getComputedStyle(el).getPropertyValue("z-index")
      );

      if (!isNaN(zIndex) && zIndex > maxZIndex) {
        maxZIndex = zIndex;
      }
    });

    setZIndex(maxZIndex + 1);
  };

  return (
    <motion.img
      onMouseDown={updateZIndex}
      style={{
        top,
        left,
        rotate,
        zIndex,
        width: isMediumScreen ? "30rem" : "15rem",
        height: isMediumScreen ? "30rem" : "15rem",
      }}
      className={twMerge(
        "drag-elements absolute w-48 bg-neutral-200 p-1 pb-4",
        className
      )}
      src={src}
      alt={alt}
      drag
      dragConstraints={containerRef}
      // Uncomment below and remove dragElastic to remove movement after release
      //   dragMomentum={false}
      dragElastic={0.65}
    />
  );
};

export default Gallery;
