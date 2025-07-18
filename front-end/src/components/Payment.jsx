import { useContext, useEffect, useState } from "react";
import { FaCcPaypal, FaCcStripe } from "react-icons/fa";
import { AppContext } from "../data/AppProvider";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import paymentImg from "/images/landingimage/payment.jpg";
import CheckoutForm from "./CheckoutForm";
import Checkout from "./Checkout";
import { useCallback } from "react";

const Payment = () => {
  const {
    total,
    cartPayment,
    cart,
    amount,
    formUser,
    information,
    payment: pay,
  } = useContext(AppContext);

  const [payment, setPayment] = useState({});
  const navigate = useNavigate();
  const [paymentSucceeded, setPaymentSucceeded] = useState(false);
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState(null);
  const url = import.meta.env.VITE_PUBLIC_MENU_URL;

  //first method: Cleaner version (identical results)No more parseFloat() needed!
  const tax = +(total * 0.1).toFixed(2); // + is faster than parseFloat
  const deliveryFee = +(total * 0.13).toFixed(2);
  const totalAll = +(total + tax + deliveryFee).toFixed(2);
  const totalInCents = Math.round(totalAll * 100);

  // second method:with parseFloat:
  // const tax = (total * 0.1).toFixed(2);
  // const deliveryFee = (total * 0.13).toFixed(2);
  // const totalAll = (total + parseFloat(tax) + parseFloat(deliveryFee)).toFixed(
  //   2
  // );
  // const totalInCents = Math.round(totalAll * 100);

  console.log("typeof totalInCents", typeof totalInCents, totalInCents);
  console.log("totalInCents validation:", {
    value: totalInCents,
    isInteger: totalInCents,
    isPositive: totalInCents > 0,
  });

  console.log("payment cart", cart);
  console.log("types", typeof totalAll, typeof tax, typeof deliveryFee);

  useEffect(() => {
    document.title = "Payment";
    fetch(`${url}/config`)
      .then(async (r) => {
        const { publishableKey } = await r.json();
        setStripePromise(loadStripe(publishableKey));
      })
      .catch((error) => console.error("Error fetching config:", error));
  }, []);

  useEffect(() => {
    fetch(`${url}/create-payment-intent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ totalInCents }),
    })
      .then(async (r) => {
        if (!r.ok) {
          throw new Error("Failed to fetch client secret");
        }
        const { clientSecret } = await r.json();
        setClientSecret(clientSecret);
      })
      .catch((error) => console.error("Error fetching client secret:", error));
  }, []);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setPayment((prevPayment) => ({
      ...prevPayment,
      [name]: value,
    }));
  }, []);

  const sellingMeals = cart.map((item) => ({
    id: item.id,
    product_name: item.name,
    amount: item.amount,
    unitPrice: item?.price[0],
    totalPrice: item?.price[0] * item?.amount,
  }));
  console.log("my product", {
    ...information,
    sellingMeals,
    subtotal: total,
    tax,
    delivery: deliveryFee,
    amount,
    total: totalAll,
    payment: payment.payment,
    tbluser_id: formUser?.id,
  });

  const ordreFun = async () => {
    const res = await fetch(`${url}/ordre`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...information,
        sellingMeals,
        subtotal: total,
        tax,
        amount,
        delivery: deliveryFee,
        total: totalAll,
        payment: payment.payment,
        tbluser_id: formUser?.id,
      }),
    });
    return res.json();
  };

  const handleSuccess = useCallback(() => {
    cartPayment(payment);
    ordreFun();
    setPaymentSucceeded(true);
  }, [payment, cartPayment]);
  console.log("pay", pay);
  console.log("payment", payment);

  const paypalClientId = import.meta.env.VITE_PAYPAL_CLIENT_ID;
  const initialOptions = {
    "client-id": paypalClientId,
    currency: "USD",
    intent: "capture",
    components: "buttons",
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
      className="min-h-screen bg-[#F5F0EA]"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div variants={childVariants}>
        <img
          src={paymentImg}
          className="landingImg"
          alt="Restaurant Payment"
          loading="lazy"
        />
      </motion.div>

      <motion.div
        className="bg-[#F9FCE1] rounded-lg shadow-md p-6 md:p-8 max-w-2xl mx-auto my-20"
        variants={containerVariants}
      >
        <h2 className="text-2xl font-bold text-[#D47A3B] mb-6 border-b pb-2 border-[#D47A3B]">
          Payment Method
        </h2>

        <form className="space-y-6 mb-8">
          <div className="space-y-4">
            <label className="flex items-center space-x-3 p-4 border border-[#D47A3B] rounded-lg hover:bg-[#F5F0EA] transition-colors cursor-pointer">
              <input
                type="radio"
                id="paypal"
                name="payment"
                value="paypal"
                onChange={handleChange}
                checked={payment.payment === "paypal"}
                className="h-5 w-5 text-[#D47A3B] focus:ring-[#D47A3B]"
              />
              <div className="flex items-center space-x-2">
                <FaCcPaypal className="text-3xl text-blue-600" />
                <span className="font-medium text-gray-800">PayPal</span>
              </div>
            </label>

            <label className="flex items-center space-x-3 p-4 border border-[#D47A3B] rounded-lg hover:bg-[#F5F0EA] transition-colors cursor-pointer">
              <input
                type="radio"
                id="stripe"
                name="payment"
                value="stripe"
                onChange={handleChange}
                checked={payment.payment === "stripe"}
                className="h-5 w-5 text-[#D47A3B] focus:ring-[#D47A3B]"
              />
              <div className="flex items-center space-x-2">
                <FaCcStripe className="text-3xl text-purple-600" />
                <span className="font-medium text-gray-800">
                  Credit/Debit Card
                </span>
              </div>
            </label>
          </div>
        </form>

        {payment.payment === "paypal" && (
          <div className="bg-white p-4 rounded-lg border border-[#D47A3B]">
            <PayPalScriptProvider options={initialOptions}>
              <Checkout onSuccess={handleSuccess} />
            </PayPalScriptProvider>
          </div>
        )}

        {payment.payment === "stripe" && stripePromise && clientSecret && (
          <div className="bg-white p-4 rounded-lg border border-[#D47A3B]">
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <CheckoutForm onSuccess={handleSuccess} />
            </Elements>
          </div>
        )}

        {paymentSucceeded && (
          <button
            className="w-full mt-6 bg-[#D47A3B] hover:bg-[#c36a2b] text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300"
            onClick={() => navigate("/bill")}
          >
            Complete Order
          </button>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Payment;
