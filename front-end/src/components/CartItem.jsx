import React, { useContext, useState } from "react";
import { CiTrash } from "react-icons/ci";
import { AppContext } from "../data/AppProvider";

const CartItem = ({ item }) => {
  const { remove, increase, decrease, updateItemPrice } =
    useContext(AppContext);

  const [isSwitchOn, setIsSwitchOn] = useState(() => {
    return localStorage.getItem(`isSwitchOn_${item.id}`) === "true";
  });

  const handleToggleSize = () => {
    const newSize = !isSwitchOn;
    setIsSwitchOn(newSize);

    const newPrice = newSize ? item.price[1] : item.price[0];
    const newImage = newSize ? item.image[1] : item.image[0];

    // Save the state to localStorage
    localStorage.setItem(`isSwitchOn_${item.id}`, newSize);
    localStorage.setItem(`itemPrice_${item.id}`, newPrice);
    localStorage.setItem(`itemImage_${item.id}`, newImage);

    updateItemPrice(item.id, newPrice, newImage);
  };

  // Get the current display values from localStorage or fallback to initial values
  const displayPrice =
    parseFloat(localStorage.getItem(`itemPrice_${item.id}`)) || item.price[0];
  const displayImage =
    localStorage.getItem(`itemImage_${item.id}`) || item.image[0];
  const itemsPrice = parseFloat((displayPrice * item?.amount).toFixed(2));

  return (
    <div className="cartDiv" data-testid="cart-item">
      <div className="cartImg">
        <img src={displayImage} alt={item?.name} className="img" />
      </div>
      <h3 className="cartName">{item?.name}</h3>
      <div>
        <h3>{displayPrice} D</h3>
        <h3>{itemsPrice} D</h3>
      </div>
      <div className="cartAmount">
        <button className="cartBtn" onClick={() => decrease(item?.id)}>
          -
        </button>
        <div>
          <h3>{item?.amount}</h3>
        </div>
        <button className="cartBtn" onClick={() => increase(item?.id)}>
          +
        </button>
        {item?.price.length > 1 && (
          <button className="linkmenu " onClick={handleToggleSize}>
            {isSwitchOn ? "Grande bouteille" : "small bouteille"}
          </button>
        )}
      </div>
      <div>
        <CiTrash className="cartTrash" onClick={() => remove(item?.id)} />
      </div>
    </div>
  );
};

export default CartItem;
