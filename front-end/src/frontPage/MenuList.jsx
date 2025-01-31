import React from "react";
import Meal from "../components/Meal";

const MenuList = ({ menuFiletr, searchParams }) => {
  return (
    <div className="menuList">
      {menuFiletr.map((meal) => {
        return <Meal key={meal.id} searchParams={searchParams} meal={meal} />;
      })}
    </div>
  );
};

export default MenuList;
