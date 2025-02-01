import React, { useContext, useEffect } from "react";
import { AppContext } from "../data/AppProvider";
import CartItem from "./CartItem";
import cartImg from "/images/landingimage/cart.jpg";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, total, amount, clearCart } = useContext(AppContext);
  const tax = parseFloat((total * 0.1).toFixed(2));
  const totalAll = parseFloat((total + tax).toFixed(2));

  useEffect(() => {
    document.title = "Cart";
  }, []);
  useEffect(() => {
    localStorage.setItem("restaurantCart", JSON.stringify(cart));
  }, [cart]);

  return (
    <div>
      <img src={cartImg} alt="cart" loading="lazy" className="landingImg" />
      <h2 className="articleHeader">votre panier.</h2>
      <div>
        {cart.length === 0 && (
          <h3 className="articleHeader">Votre panier est actuellement vide.</h3>
        )}
      </div>
      <div>
        {cart?.map((item) => (
          <CartItem item={item} key={item.id} />
        ))}
      </div>
      <div className="cartResult">
        <h3>Montant : {amount}</h3>
        <h3>Sous-total : {total} D</h3>
        <h3>Taxe : {tax} D</h3>
        <h3>Total : {totalAll} D</h3>
        <div className="cartCheck">
          <Link onClick={clearCart} className="linkmenu">
            Tout effacer
          </Link>
          <Link className="linkmenu" to="/information">
            Passer à la caisse
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Cart;
