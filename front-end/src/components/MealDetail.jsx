import { useContext } from "react";
import { Link, useLoaderData, useLocation } from "react-router-dom";
import mealDetail from "/images/landingimage/mealDetail.jpg";
import { getMeals } from "../data/API";
import { AppContext } from "../data/AppProvider";
import { Helmet } from "react-helmet-async";
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
      <Helmet>
        <title>Détail du Repas</title>
        <meta
          name="description"
          content={`Découvrez les détails de notre délicieux repas: ${name}.`}
        />
        <meta property="og:title" content="Détail du Repas" />
        <meta
          property="og:description"
          content={`Découvrez les détails de notre délicieux repas: ${name}.`}
        />
        <meta
          property="og:image"
          content="https://elbahjarestaurant.vercel.app/images/landingimage/mealDetail.jpg"
        />
        <meta property="og:url" content={window.location.href} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Détail du Repas" />
        <meta
          name="twitter:description"
          content={`Découvrez les détails de notre délicieux repas: ${name}.`}
        />
        <meta
          name="twitter:image"
          content="https://elbahjarestaurant.vercel.app/images/landingimage/mealDetail.jpg"
        />
        <meta name="robots" content="index, follow" />
        <meta name="keywords" content="repas, détail, restaurant, cuisine" />
        <meta name="author" content="el bahja" />
        <link
          rel="canonical"
          href={`https://elbahjarestaurant.vercel.app/menu/${id}`}
        />
      </Helmet>
      <img
        src={mealDetail}
        alt="mealDetailImg"
        loading="lazy"
        className="landingImg"
      />
      <div className="detailDiv">
        <div className="detailImg">
          <img src={displayImage} alt="Meal" loading="lazy" className="img" />
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
            <button className="typeBtn m-auto" onClick={handleToggleSize}>
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
