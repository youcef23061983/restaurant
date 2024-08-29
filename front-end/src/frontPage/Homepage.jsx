import { useRef, useState, useEffect } from "react";
import { ReactLenis } from "lenis/dist/lenis-react";
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";

import welcome1 from "/images/frontpage/welcome1.jpg";
import welcome2 from "/images/frontpage/welcome2.jpg";
import welcome3 from "/images/frontpage/welcome3.jpg";
import welcome4 from "/images/frontpage/welcome4.jpg";
import introduction from "/images/frontpage/introduction.jpg";
import cook from "/images/frontpage/cook.jpg";
import { Link } from "react-router-dom";
import TextParallaxContentExample from "./Image";
import Carousel from "./Carousel";
const HomePage = () => {
  return (
    <>
      <div style={{ backgroundColor: "rgb(245, 240, 234)" }}>
        <ReactLenis
          root
          options={{
            lerp: 0.05,
          }}
        >
          <Hero />
        </ReactLenis>
      </div>
      <ReactLenis
        root
        options={{
          lerp: 0.05,
        }}
      >
        <Introduction />
      </ReactLenis>
      <ReactLenis
        root
        options={{
          lerp: 0.05,
        }}
      >
        <TextParallaxContentExample />
      </ReactLenis>
      <ReactLenis
        root
        options={{
          lerp: 0.05,
        }}
      >
        <Carousel />
      </ReactLenis>

      <ReactLenis
        root
        options={{
          lerp: 0.05,
        }}
      >
        <CookStaff />
      </ReactLenis>
    </>
  );
};

const SECTION_HEIGHT = 1500;

const Hero = () => {
  return (
    <div
      style={{ height: `calc(${SECTION_HEIGHT}px + 100vh)` }}
      className="relative w-full"
    >
      <CenterImage />

      <ParallaxImages />

      <div className="absolute bottom-0 left-0 right    -0 h-96 bg-gradient-to-b from-zinc-950/0 to-zinc-950" />
    </div>
  );
};

const CenterImage = () => {
  const { scrollY } = useScroll();

  const clip1 = useTransform(scrollY, [0, 1500], [25, 0]);
  const clip2 = useTransform(scrollY, [0, 1500], [75, 100]);

  const clipPath = useMotionTemplate`polygon(${clip1}% ${clip1}%, ${clip2}% ${clip1}%, ${clip2}% ${clip2}%, ${clip1}% ${clip2}%)`;

  const backgroundSize = useTransform(
    scrollY,
    [0, SECTION_HEIGHT + 500],
    ["170%", "100%"]
  );
  const opacity = useTransform(
    scrollY,
    [SECTION_HEIGHT, SECTION_HEIGHT + 500],
    [1, 0]
  );

  return (
    <motion.div
      className="sticky top-0 h-screen w-full"
      style={{
        clipPath,
        backgroundSize,
        opacity,
        backgroundImage: "url(/images/frontpage/welcome.jpg)",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    />
  );
};

const ParallaxImages = () => {
  return (
    <div className="mx-auto max-w-5xl px-4 pt-[200px]">
      <ParallaxImg
        alt="And example of a space launch"
        start={-200}
        end={200}
        className="w-1/3"
        src={welcome2}
      />
      <ParallaxImg
        src={welcome1}
        alt="An example of a space launch"
        start={200}
        end={-250}
        className="mx-auto w-2/3"
      />
      <ParallaxImg
        src={welcome4}
        alt="Orbiting satellite"
        start={-200}
        end={200}
        className="ml-auto w-1/3"
      />
      <ParallaxImg
        src={welcome3}
        alt="Orbiting satellite"
        start={0}
        end={-500}
        className="ml-24 w-5/12"
      />
    </div>
  );
};

const ParallaxImg = ({ className, alt, src, start, end }) => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`${start}px end`, `end ${end * -1}px`],
  });

  const opacity = useTransform(scrollYProgress, [0.75, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0.75, 1], [1, 0.85]);

  const y = useTransform(scrollYProgress, [0, 1], [start, end]);
  const transform = useMotionTemplate`translateY(${y}px) scale(${scale})`;

  return (
    <motion.img
      src={src}
      alt={alt}
      className={className}
      ref={ref}
      style={{ transform, opacity }}
    />
  );
};
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
const Introduction = () => {
  const ref = useRef(null);

  const isMediumScreen = useMediaQuery("(min-width: 768px)");

  const { scrollYProgress: scrollYProgress1 } = useScroll({
    ref: ref,
    offset: ["0 1", isMediumScreen ? "0.3 0" : "0.25 0"],
  });
  const scrollOpacity = useTransform(
    scrollYProgress1,
    [0, 0.5, 1],
    [0, 0.3, 1]
  );
  const scrollX = useTransform(scrollYProgress1, [0, 1], [-900, 0]);
  const scrollImg = useTransform(scrollYProgress1, [0, 1], [900, 0]);

  return (
    <div className="section" ref={ref}>
      <motion.div
        className="imgDiv"
        style={{
          opacity: scrollOpacity,
          x: scrollImg,
        }}
      >
        <img src={introduction} alt="wait" className="img" />
      </motion.div>
      <motion.div
        className="p"
        style={{
          opacity: scrollOpacity,
          x: scrollX,
        }}
      >
        <h2>Un Voyage Culinaire au Cœur d'Alger chez "El Bahja"</h2>

        <p>
          Découvrez l'authenticité et la richesse de la cuisine marocaine au
          cœur de notre restaurant traditionnel, "El Bahja". Plongez dans une
          ambiance chaleureuse et conviviale, où chaque détail a été
          soigneusement pensé pour vous offrir une expérience culinaire unique.
          Nos plats, préparés avec des ingrédients frais et des épices exquises,
          vous transporteront au cœur des souks de Marrakech et des riads de
          Fès. Que vous soyez amateur de couscous, de tajine ou de pâtisseries
          orientales, chaque bouchée est une invitation au voyage, célébrant
          l'hospitalité et les saveurs envoûtantes d'Alger' .
        </p>
        <Link className="link-btn" to="about">
          explorez davantage
        </Link>
      </motion.div>
    </div>
  );
};

const CookStaff = () => {
  const ref2 = useRef(null);

  const isMediumScreen = useMediaQuery("(min-width: 768px)");

  const { scrollYProgress: scrollYProgress2 } = useScroll({
    ref: ref2,
    offset: ["0 1", isMediumScreen ? "0.83 0" : "0.25 0"],
  });
  const scrollOpacity2 = useTransform(
    scrollYProgress2,
    [0, 0.7, 0.9, 1],
    [0, 0.3, 0.5, 1]
  );

  return (
    <div className="section" ref={ref2}>
      <motion.div
        className="imgDiv"
        style={{
          opacity: scrollOpacity2,
        }}
      >
        <img src={cook} alt="wait" className="img" />
      </motion.div>
      <motion.div
        className="p"
        style={{
          opacity: scrollOpacity2,
        }}
      >
        <h2>Artisans de la Cuisine Traditionnelle Algérienne</h2>
        <p>
          L'équipe de cuisine de notre restaurant algérien est composée de
          véritables artisans culinaires, chacun animé par une passion profonde
          pour les traditions gastronomiques de l'Algérie. Nos chefs maîtrisent
          l'art de créer des plats qui racontent l'histoire et la culture de
          notre pays, en respectant les recettes ancestrales tout en apportant
          une touche d'innovation. Chaque détail compte, de la sélection
          minutieuse des ingrédients frais et locaux à la préparation soignée
          qui sublime les saveurs authentiques. Notre équipe s'engage à offrir
          une expérience culinaire immersive, où chaque plat est une invitation
          à découvrir les richesses culinaires de l'Algérie, des épices
          envoûtantes aux arômes délicats. Avec un dévouement sans faille, nos
          chefs travaillent en harmonie pour apporter à votre table un véritable
          festin, où l'hospitalité algérienne est mise à l'honneur dans chaque
          bouchée.
        </p>
        <Link className="link-btn" to="about">
          explorez davantage{" "}
        </Link>
      </motion.div>
    </div>
  );
};

export default HomePage;
