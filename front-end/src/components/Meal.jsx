import React from "react";
import { Link } from "react-router-dom";

const Meal = ({ meal, searchParams }) => {
  const { name, image, price, id } = meal;

  return (
    <div className="mealUnit">
      <Link to={id} state={{ search: `?${searchParams.toString()}` }}>
        <div className="unitImg">
          <img src={image[0]} alt="" className="img" />
        </div>
      </Link>

      <h3>name :{name}</h3>
      <h3>price :{price[0]} D</h3>
      <Link to="/cart" className="linkmenu">
        add to Cart
      </Link>
    </div>
  );
};

export default Meal;
