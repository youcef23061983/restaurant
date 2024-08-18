// import React, { useContext, useEffect } from "react";
// import { AppContext } from "../data/AppProvider";
// import CartItem from "./CartItem";
// import cartImg from "/images/landingimage/cart.jpg";
// import { Link } from "react-router-dom";

// const Cart = () => {
//   const { cart, total, amount, updatedCart, clearCart } =
//     useContext(AppContext);
//   const tax = parseFloat((total * 0.1).toFixed(2));
//   const totalAll = parseFloat((total + tax).toFixed(2));
//   useEffect(() => {
//     document.title = "Cart";
//   }, []);
//   return (
//     <div>
//       <img src={cartImg} alt="" className="landingImg" />
//       <h2 className="articleHeader">votre panier.</h2>
//       <div>
//         {cart.length === 0 && (
//           <h3 className="articleHeader">Votre panier est actuellement vide.</h3>
//         )}
//       </div>
//       <div>
//         {cart.map((item) => {
//           return <CartItem item={item} key={item.id} />;
//         })}
//       </div>
//       <div className="cartResult">
//         <h3>amount: {amount} </h3>
//         <h3>SUBTOTAL: {total} $</h3>
//         <h3>TAX: {tax} $</h3>
//         <h3>TOTAL: {totalAll} $</h3>
//         <div className="cartCheck">
//           <Link onClick={clearCart} className="linkmenu">
//             clear all
//           </Link>
//           <Link className="linkmenu" to="/payment" onClick={updatedCart}>
//             proceed to checkout
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Cart;

import React, { useContext, useEffect } from "react";
import { AppContext } from "../data/AppProvider";
import CartItem from "./CartItem";
import cartImg from "/images/landingimage/cart.jpg";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, total, amount, updatedCart, clearCart } =
    useContext(AppContext);
  const tax = parseFloat((total * 0.1).toFixed(2));
  const totalAll = parseFloat((total + tax).toFixed(2));

  useEffect(() => {
    document.title = "Cart";
  }, []);

  return (
    <div>
      <img src={cartImg} alt="" className="landingImg" />
      <h2 className="articleHeader">votre panier.</h2>
      <div>
        {cart.length === 0 && (
          <h3 className="articleHeader">Votre panier est actuellement vide.</h3>
        )}
      </div>
      <div>
        {cart.map((item) => (
          <CartItem item={item} key={item.id} />
        ))}
      </div>
      <div className="cartResult">
        <h3>Amount: {amount}</h3>
        <h3>Subtotal: {total} $</h3>
        <h3>Tax: {tax} $</h3>
        <h3>Total: {totalAll} $</h3>
        <div className="cartCheck">
          <Link onClick={clearCart} className="linkmenu">
            Clear All
          </Link>
          <Link className="linkmenu" to="/payment" onClick={updatedCart}>
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Cart;
