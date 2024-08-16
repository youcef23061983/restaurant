import React, { useEffect, useState } from "react";
import menuImg from "/images/landingimage/menu.jpg";
import { useLoaderData, useSearchParams } from "react-router-dom";
import Meal from "./Meal";
import MenuHeader from "./MenuHeader";
import { getMeals } from "../data/API";
export const loader = async () => {
  return getMeals();
};
const Menu = () => {
  const data = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();
  const menuType = searchParams.get("type");
  console.log(searchParams.toString());
  // localStorage.removeItem("loggedin");

  const menuFiletr = menuType
    ? data.filter((meal) => meal.type === menuType)
    : [];
  let types = [...new Set(data.map((meal) => meal.type))];

  return (
    <div>
      <img src={menuImg} alt="" className="landingImg" />

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
