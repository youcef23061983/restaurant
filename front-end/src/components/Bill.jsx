import React, { useContext, useEffect } from "react";
import { AppContext } from "../data/AppProvider";
import billImg from "/images/landingimage/bill.jpg";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";

const Bill = () => {
  const { payment, information, cart, total, amount } = useContext(AppContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!payment.payment) {
      navigate("/payment");
    }
  }, [payment]);
  const tax = parseFloat((total * 0.1).toFixed(2));
  const deliveryFee = parseFloat((total * 0.13).toFixed(2));
  const totalAll = parseFloat((total + tax + deliveryFee).toFixed(2));
  const containerVariants = {
    hidden: { x: "100vw", opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 2,
        type: "spring",
        stiffness: 50,
        when: "beforeChildren",
        staggerChildren: 1,
      },
    },
    exit: {
      x: "-100vw",
      transition: { ease: "easeInOut" },
    },
  };
  const childVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1, ease: "easeInOut" } },
  };
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <Helmet>
        <title>Bill</title>
        <meta
          name="description"
          content="View your bill and payment details."
        />
        <meta property="og:title" content="Bill" />
        <meta
          property="og:description"
          content="View your bill and payment details."
        />
        <meta property="og:image" content={billImg} />
        <meta property="og:url" content={window.location.href} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Bill" />
        <meta
          name="twitter:description"
          content="View your bill and payment details."
        />
        <meta name="twitter:image" content={billImg} />
        <meta name="robots" content="index, follow" />
        <meta name="keywords" content="bill, payment, details, restaurant" />
        <meta name="author" content="el bahja" />
      </Helmet>

      <motion.div variants={childVariants}>
        <img src={billImg} alt="bill" loading="lazy" className="landingImg" />
      </motion.div>
      <motion.h2 className="articleHeader" variants={containerVariants}>
        Votre commande{" "}
      </motion.h2>
      <motion.div className="x" variants={containerVariants}>
        <div className="orderContainer">
          <div className="orderItem">
            <h2 className="orderTitle">information:</h2>
            <p>
              <span className="mealSpan">Nom et Prenom: </span>
              {information.fullName}
            </p>

            <p>
              <span className="mealSpan">Adresse: </span>
              {information.address}
            </p>

            <Link to="/information" className="linkmenu">
              Modifiez
            </Link>
          </div>
          <div className="orderItem">
            <h2 className="orderTitle">Payment:</h2>
            <p>
              <span className="mealSpan">Type: </span>
              {payment.payment}
            </p>

            <Link to="/payment" className="linkmenu">
              Modifiez
            </Link>
          </div>
        </div>
        <div className="y">
          <div className="orderItem">
            <h2 className="orderTitle">
              Votre paiement a été effectué avec succès
            </h2>
          </div>
          <div className="cartContainer">
            {cart.map((item) => {
              const itemsPrice = parseFloat(
                (item?.displayPrice * item?.amount).toFixed(2)
              );
              return (
                <div className="cartDiv" key={item.id}>
                  <div className="cartImg">
                    <img
                      src={item?.displayImage}
                      alt="cartImg"
                      loading="lazy"
                      className="img "
                    />
                  </div>
                  <h3 className="cartName">{item?.name}...</h3>
                  <div>
                    <h3>{itemsPrice} $</h3>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="cartResult">
            <p>
              <span className="mealSpan">Montant: </span>
              {amount}
            </p>
            <p>
              <span className="mealSpan">Sous-total: </span>
              {total} D
            </p>
            <p>
              <span className="mealSpan">Taxe:</span>
              {tax} D
            </p>
            <p>
              <span className="mealSpan">Frais de livraison: </span>
              {deliveryFee} D
            </p>
            <p>
              <span className="mealSpan">TOTAL: </span>
              {totalAll} D
            </p>
            <div className="cartCheck">
              <Link className="linkmenu" to="/">
                Passer la commande
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Bill;
