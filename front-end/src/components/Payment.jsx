import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../data/AppProvider";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"; // Make sure PayPalButtons is imported
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import paymentImg from "/images/landingimage/payment.jpg";
import CheckoutForm from "./CheckoutForm";
import Checkout from "./Checkout";

const Payment = () => {
  const { total, information, cart, cartPayment } = useContext(AppContext);
  console.log(total, information, cart);

  const [payment, setPayment] = useState({});
  const navigate = useNavigate();
  const [paymentSucceeded, setPaymentSucceeded] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPayment((prevPayment) => ({
      ...prevPayment,
      [name]: value,
    }));
  };

  useEffect(() => {
    document.title = "Payment";
  }, []);

  const paymentSubmit = (e) => {
    e.preventDefault();
    cartPayment(payment);

    if (paymentSucceeded) {
      navigate("/bill");
    }
    navigate("/bill");
  };

  const handleSuccess = () => {
    setPaymentSucceeded(true);
  };

  const paypalClientId = import.meta.env.VITE_PAYPAL_CLIENT_ID;
  const initialOptions = {
    "client-id": paypalClientId,
    currency: "USD",
    intent: "capture",
    components: "buttons",
  };

  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
  const stripeOptions = {
    clientSecret: import.meta.env.VITE_STRIPE_SECRET_KEY,
  };

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
      <motion.div variants={childVariants}>
        <img src={paymentImg} className="landingImg" alt="Payment" />
      </motion.div>
      <motion.div className="loginContainer" variants={containerVariants}>
        <h2>Méthode de paiement:</h2>
        <form onSubmit={paymentSubmit} className="login-form">
          <label>
            Paypal:
            <input
              type="radio"
              id="paypal"
              name="payment"
              value="paypal"
              onChange={handleChange}
              checked={payment.payment === "paypal"}
            />
          </label>
          <br />
          <label>
            Stripe:
            <input
              type="radio"
              id="stripe"
              name="payment"
              value="stripe"
              onChange={handleChange}
              checked={payment.payment === "stripe"}
            />
          </label>
          <br />
          {payment.payment === "paypal" && (
            <PayPalScriptProvider options={initialOptions}>
              <Checkout onSuccess={handleSuccess} />
            </PayPalScriptProvider>
          )}

          {payment.payment === "stripe" && (
            <Elements stripe={stripePromise} options={stripeOptions}>
              <CheckoutForm />
            </Elements>
          )}
          {/* {paymentSucceeded && ( */}
          <button type="submit" className="addCart">
            Continue
          </button>
          {/* )} */}
        </form>
      </motion.div>
    </motion.div>
  );
};

export default Payment;
