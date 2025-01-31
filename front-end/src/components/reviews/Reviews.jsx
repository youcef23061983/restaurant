import React, { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight, FaQuoteRight } from "react-icons/fa";
import reviews from "./data";
const Reviews = () => {
  const [index, setIndex] = useState(0);
  const { id, image, name, text, job } = reviews[index];
  const x = reviews.length;

  useEffect(() => {
    const slider = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % x);
    }, 5000);

    return () => clearInterval(slider);
  }, []);

  return (
    <article className="review">
      <div className="img-container">
        <img
          src={image}
          alt={name}
          className="person-img"
          loading="lazy"
          key={id}
        />
        <span className="quote-icon">
          <FaQuoteRight />
        </span>
      </div>
      <h2>{name}</h2>
      <p>{job}</p>
      <p>{text}</p>
      <div>
        <button
          className="typeBtn"
          style={{ marginRight: "10px" }}
          onClick={() => setIndex((prev) => prev - 1)}
          disabled={index === 0}
        >
          <FaChevronLeft />
        </button>

        <button
          className="typeBtn"
          onClick={() => setIndex((prev) => (prev + 1) % x)}
          disabled={index == x - 1}
        >
          <FaChevronRight />
        </button>
      </div>
    </article>
  );
};

export default Reviews;
