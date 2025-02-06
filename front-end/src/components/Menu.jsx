import menuImg from "/images/landingimage/menu.jpg";
import { useLoaderData, useSearchParams } from "react-router-dom";
import Meal from "./Meal";
import MenuHeader from "./MenuHeader";
import { getMeals } from "../data/API";
import { Helmet } from "react-helmet-async";

export const loader = async () => {
  return getMeals();
};
const Menu = () => {
  const data = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();
  const menuType = searchParams.get("type");
  // localStorage.removeItem("loggedin");

  const menuFiletr = menuType
    ? data.filter((meal) => meal.type === menuType)
    : [];
  let types = [...new Set(data.map((meal) => meal.type))];

  return (
    <div>
      <Helmet>
        <title>Menu</title>
        <meta
          name="description"
          content="Explore our diverse menu options and find your favorite meal."
        />
        <meta property="og:title" content="Our Menu" />
        <meta
          property="og:description"
          content="Explore our diverse menu options and find your favorite meal."
        />
        <meta
          property="og:image"
          content="https://elbahjarestaurant.vercel.app/images/landingimage/menu.jpg"
        />
        <meta property="og:url" content={window.location.href} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Our Menu" />
        <meta
          name="twitter:description"
          content="Explore our diverse menu options and find your favorite meal."
        />
        <meta
          name="twitter:image"
          content="https://elbahjarestaurant.vercel.app/images/landingimage/menu.jpg"
        />
        <meta name="robots" content="index, follow" />
        <meta name="keywords" content="menu, food, restaurant, meals, dining" />
        <meta name="author" content="el bahja" />
      </Helmet>
      <img src={menuImg} alt="menuImg" loading="lazy" className="landingImg" />

      <MenuHeader />
      <div className="btnsDiv">
        {types.map((type, id) => (
          <button
            className={`typeBtn ${menuType === type ? "selected" : null}`}
            key={id}
            name="type"
            id="type"
            value={type}
            onClick={() => setSearchParams({ type })}
          >
            {type}
          </button>
        ))}
      </div>
      <div className="menuList">
        {menuFiletr.map((meal) => {
          return <Meal key={meal.id} searchParams={searchParams} meal={meal} />;
        })}
      </div>
    </div>
  );
};

export default Menu;
