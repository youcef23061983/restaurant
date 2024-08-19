import React, { useContext, useState } from "react";
import { CiTrash } from "react-icons/ci";
import { AppContext } from "../data/AppProvider";

const CartItem = ({ item }) => {
  // const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [isSwitchOn, setIsSwitchOn] = useState(() => {
    // Load the saved switch state from localStorage
    return localStorage.getItem(`isSwitchOn_${item.id}`) === "true";
  });
  const { remove, increase, decrease, updateItemPrice } =
    useContext(AppContext);

  // const handleToggleSize = () => {
  //   const newSize = !isSwitchOn;
  //   setIsSwitchOn(newSize);
  //   updateItemPrice(item.id, newSize ? item.price[1] : item.price[0]);
  // };
  const handleToggleSize = () => {
    const newSize = !isSwitchOn;
    setIsSwitchOn(newSize);

    const newPrice = newSize ? item.price[1] : item.price[0];
    const newImage = newSize ? item.image[1] : item.image[0];

    // Save the state to localStorage
    localStorage.setItem(`isSwitchOn_${item.id}`, newSize);
    localStorage.setItem(`itemPrice_${item.id}`, newPrice);
    localStorage.setItem(`itemImage_${item.id}`, newImage);

    updateItemPrice(item.id, newPrice);
  };

  // const displayPrice =
  //   isSwitchOn && item?.price.length > 1 ? item.price[1] : item.price[0];
  // const displayImage =
  //   isSwitchOn && item?.image.length > 1 ? item.image[1] : item.image[0];
  // const itemsPrice = parseFloat((displayPrice * item?.amount).toFixed(2));

  const displayPrice =
    parseFloat(localStorage.getItem(`itemPrice_${item.id}`)) || item.price[0];
  const displayImage =
    localStorage.getItem(`itemImage_${item.id}`) || item.image[0];
  const itemsPrice = parseFloat((displayPrice * item?.amount).toFixed(2));

  return (
    <div className="cartDiv" data-testid="cart-item">
      <div className="cartImg">
        <img src={displayImage} alt="" className="img" />
      </div>
      <h3 className="cartName">{item?.name}</h3>
      <div>
        <h3>{displayPrice} $</h3>
        <h3>{itemsPrice} $</h3>
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
          <button className="typeBtn" onClick={handleToggleSize}>
            {isSwitchOn ? "Get Small" : "Get Big"}
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
