// import React, { useContext, useState } from "react";
// import { CiTrash } from "react-icons/ci";
// import { AppContext } from "../data/AppProvider";

// const CartItem = ({ item }) => {
//   const [isSwitchOn, setIsSwitchOn] = useState(false);
//   const { remove, increase, decrease, updateItemPrice } =
//     useContext(AppContext);

//   const handleToggleSize = () => {
//     const newSize = !isSwitchOn;
//     setIsSwitchOn(newSize);
//     updateItemPrice(item.id, newSize ? item.price[1] : item.price[0]);
//   };

//   const displayPrice =
//     isSwitchOn && item?.price.length > 1 ? item.price[1] : item.price[0];
//   const displayImage =
//     isSwitchOn && item?.image.length > 1 ? item.image[1] : item.image[0];
//   const itemsPrice = parseFloat((displayPrice * item?.amount).toFixed(2));

//   return (
//     <div className="cartDiv" data-testid="cart-item">
//       <div className="cartImg">
//         <img src={displayImage} alt="" className="img" />
//       </div>
//       <h3 className="cartName">{item?.name}</h3>
//       <div>
//         <h3>{displayPrice} $</h3>
//         <h3>{itemsPrice} $</h3>
//       </div>
//       <div className="cartAmount">
//         <button className="cartBtn" onClick={() => decrease(item?.id)}>
//           -
//         </button>
//         <div>
//           <h3>{item?.amount}</h3>
//         </div>
//         <button className="cartBtn" onClick={() => increase(item?.id)}>
//           +
//         </button>
//         {item?.price.length > 1 && (
//           <button className="typeBtn" onClick={handleToggleSize}>
//             {isSwitchOn ? "Get Small" : "Get Big"}
//           </button>
//         )}
//       </div>
//       <div>
//         <CiTrash className="cartTrash" onClick={() => remove(item?.id)} />
//       </div>
//     </div>
//   );
// };

// export default CartItem;

import React, { useContext } from "react";
import { CiTrash } from "react-icons/ci";
import { AppContext } from "../data/AppProvider";

const CartItem = ({ item }) => {
  const { remove, increase, decrease, handleToggleSize, isSwitchOn } =
    useContext(AppContext);

  const displayImage = item?.image?.[isSwitchOn ? 1 : 0] || null;
  const displayPrice = item?.displayPrice || item?.price[0]; // Use the displayPrice from cart

  let itemsPrice = displayPrice * item?.amount;
  itemsPrice = parseFloat(itemsPrice.toFixed(2));

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
        {item?.price?.length > 1 && (
          <button className="typeBtn" onClick={() => handleToggleSize(item.id)}>
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
