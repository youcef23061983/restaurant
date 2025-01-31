import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../data/AppProvider";

const Meal = ({ meal, searchParams }) => {
  const { addTocart } = useContext(AppContext);
  const { name, image, price, id } = meal;

  return (
    <div className="mealUnit">
      <Link
        to={`/menu/${id}`}
        state={{ search: `?${searchParams.toString()}` }}
      >
        <div className="unitImg">
          <img src={image[0]} alt="mealImg" loading="lazy" className="img" />
        </div>
      </Link>

      <h3>name :{name}</h3>
      <h3>price :{price[0]} D</h3>
      <Link to="/cart" className="linkmenu" onClick={() => addTocart(id)}>
        Ajouter au panier
      </Link>
    </div>
  );
};

export default Meal;
