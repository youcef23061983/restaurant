import { useContext, useState } from "react";
import { Link, useLoaderData, useLocation, useParams } from "react-router-dom";
import mealDetail from "/images/landingimage/mealDetail.jpg";
import { getMeals } from "../data/API";
import { AppContext } from "../data/AppProvider";
export const loader = async ({ params }) => {
  return getMeals(params.id);
};

const MealDetail = () => {
  const location = useLocation();
  const data = useLoaderData();
  const { handleToggleSize, isSwitchOn, addTocart } = useContext(AppContext);

  const { name, description, image, price, type, id } = data;

  const displayImage = isSwitchOn && image ? image[1] : image ? image[0] : null;
  const displayPrice = isSwitchOn && price ? price[1] : price ? price[0] : null;
  const displayTitle = isSwitchOn ? "get big" : "get small";
  return (
    <div>
      <img src={mealDetail} alt="" className="landingImg" />
      <div className="detailDiv">
        <div className="detailImg">
          <img src={displayImage} alt="Meal" className="img" />
        </div>
        <div className="mealContainer">
          <p>
            <span className="mealSpan">nom du repas: </span>
            {name}
          </p>
          <p>
            <span className="mealSpan">type: </span>
            {type}
          </p>
          <p>
            <span className="mealSpan">description: </span>
            {description}
          </p>
          <p>
            <span className="mealSpan">prix: </span>
            {displayPrice} D
          </p>
          {price && price.length > 1 ? (
            <button className="typeBtn" onClick={handleToggleSize}>
              {displayTitle}
            </button>
          ) : null}
          <Link className="typeBtn" to="/cart" onClick={() => addTocart(id)}>
            Ajouter au panier
          </Link>
          <Link
            className="typeBtn"
            to={`..${location.state?.search}`}
            relative="path"
          >
            "Retourner au type {location.state?.search.slice(6)}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MealDetail;
