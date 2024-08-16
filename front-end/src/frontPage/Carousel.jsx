import { motion, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";

const Carousel = () => {
  return (
    <div>
      <HorizontalScrollCarousel />
    </div>
  );
};

const HorizontalScrollCarousel = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"]);

  return (
    <section ref={targetRef} className="relative h-[300vh]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-4">
          {cards.map((card) => {
            return <Card card={card} key={card.id} />;
          })}
        </motion.div>
      </div>
    </section>
  );
};

const Card = ({ card }) => {
  return (
    <div
      key={card.id}
      className="group relative h-[450px] w-[450px] overflow-hidden bg-neutral-200"
    >
      <div
        style={{
          backgroundImage: `url(${card.url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="absolute inset-0 z-0 transition-transform duration-300 group-hover:scale-110"
      ></div>
    </div>
  );
};

export default Carousel;

const cards = [
  {
    url: "/images/carousel/welcome1.jpg",
    id: 1,
  },
  {
    url: "/images/carousel/welcome2.jpg",
    id: 2,
  },
  {
    url: "/images/carousel/welcome3.jpg",

    id: 3,
  },
  {
    url: "/images/carousel/welcome4.jpg",

    id: 4,
  },
  {
    url: "/images/carousel/welcome5.jpg",

    id: 5,
  },
  {
    url: "/images/carousel/welcome6.jpg",

    id: 6,
  },
  {
    url: "/images/carousel/welcome7.jpg",

    id: 7,
  },
  {
    url: "/images/carousel/welcome8.jpg",

    id: 8,
  },
  {
    url: "/images/carousel/welcome9.jpg",

    id: 9,
  },
];
