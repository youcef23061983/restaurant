import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";
import notrehistoire from "/images/landingimage/notrehistoire.jpg";
import { Helmet } from "react-helmet-async";

const About = () => {
  const ref = useRef();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "-0.08 0"],
  });
  const scrollOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.3, 1]);
  const scrollparagraph = useTransform(scrollYProgress, [0, 1], [-200, 0]);
  const scrollHeader = useTransform(scrollYProgress, [0, 1], [200, 0]);
  const pageTitle = "About Us - El Bahja";

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content="Nos repas traditionnels algériens" />
        <meta property="og:title" content="Menu Repas" />
        <meta
          property="og:description"
          content="Nos repas traditionnels algériens"
        />
        <meta property="og:image" content={notrehistoire} />
        <meta property="og:url" content={window.location.href} />

        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Menu Repas" />
        <meta
          name="twitter:description"
          content="Nos repas traditionnels algériens"
        />
        <meta name="twitter:image" content={notrehistoire} />
        <meta name="robots" content="index, follow" />
        <meta
          name="keywords"
          content="Menu, Boissons, Dessert, Repas, Commander, Réserver"
        />
        <meta name="author" content="el bahja" />
      </Helmet>

      <img
        src={notrehistoire}
        alt="about"
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
          El Bahja: Une Histoire d'Authenticité et de Savoir-Faire Algérien
          Depuis 1902
        </motion.h2>
        <motion.p
          style={{
            opacity: scrollOpacity,
            x: scrollparagraph,
          }}
          className="articleParagraph"
        >
          Depuis plus d'un siècle, El Bahja incarne l'âme culinaire de
          l'Algérie, perpétuant les traditions gastronomiques avec passion et
          excellence. Fondé en 1902 au cœur d'Alger, ce restaurant a su
          conquérir le cœur des amateurs de cuisine authentique grâce à un
          savoir-faire transmis de génération en génération.
          <br />
          <br />
          L'histoire d'El Bahja commence dans une modeste ruelle d'Alger, où son
          fondateur, un maître cuisinier dévoué à son art, a ouvert les portes
          de ce qui allait devenir une véritable institution. Sa vision était
          simple : offrir aux habitants de la ville une cuisine qui célèbre la
          richesse des saveurs et des traditions algériennes. Dès ses débuts, le
          restaurant a attiré une clientèle fidèle, séduite par la qualité des
          plats et l’ambiance chaleureuse des lieux.
          <br />
          <br />
          Au fil des décennies, El Bahja a su préserver l'authenticité de sa
          cuisine tout en s'adaptant aux goûts et aux attentes d'une clientèle
          toujours plus exigeante. Les recettes, soigneusement élaborées,
          respectent les techniques ancestrales tout en intégrant les meilleurs
          ingrédients locaux. Du couscous parfumé aux épices fines, aux tajines
          mijotés avec amour, chaque plat raconte l'histoire d'un pays riche en
          traditions.
          <br />
          <br />
          Le succès d'El Bahja ne s'est pas limité à Alger. Aujourd'hui, le
          restaurant compte 35 succursales à travers tout le pays, de la
          Méditerranée aux confins du Sahara. Chaque établissement, bien que
          moderne dans son agencement, reste fidèle à l’esprit d’origine,
          offrant à ses clients une expérience culinaire qui est à la fois un
          voyage dans le temps et une célébration des saveurs d’Algérie.
          <br />
          <br />
          Chaque jour, les équipes d'El Bahja perpétuent cet héritage, avec un
          engagement sans faille envers la qualité et l'authenticité. Les chefs,
          formés selon les méthodes traditionnelles, préparent les plats avec
          une passion qui se ressent dans chaque bouchée. Que ce soit pour un
          repas familial, une célébration ou un simple déjeuner entre amis, El
          Bahja est le lieu où l'on se retrouve pour partager bien plus qu'un
          repas : une véritable immersion dans l'âme de la cuisine algérienne.
          <br />
          <br />
          Ainsi, El Bahja ne se contente pas de nourrir ses clients, il leur
          offre une part de l'histoire de l'Algérie, un héritage culinaire
          préservé avec soin depuis plus de 120 ans. Avec ses 35 branches à
          travers le pays, El Bahja continue de grandir tout en restant fidèle à
          ses racines, rendant hommage à la richesse de la culture culinaire
          algérienne, une assiette à la fois.
        </motion.p>
      </div>
    </>
  );
};

export default About;
