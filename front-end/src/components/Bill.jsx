import { useContext, useEffect } from "react";
import { AppContext } from "../data/AppProvider";
import billImg from "/images/landingimage/bill.jpg";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";

const Bill = () => {
  const { payment, information, cart, total } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!payment.payment) {
      navigate("/payment");
    }
    document.title = "bill";
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
      <div className="max-w-4xl mx-auto px-4">
        {/* Bill Container */}
        <motion.div
          variants={containerVariants}
          className="bg-[#F9FCE1] rounded-lg shadow-xl p-6 mb-8 border border-[#D47A3B]"
        >
          {/* Customer Information */}
          <div className="grid md:grid-cols-2 gap-8 mb-5">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4 text-[#D47A3B] border-b pb-2">
                Information Client
              </h2>
              <div className="space-y-3">
                <p>
                  <span className="font-semibold text-gray-700 text-xl">
                    Nom et Prénom:
                  </span>
                  <span className="ml-2 text-xl">{information.fullName}</span>
                </p>
                <p>
                  <span className="font-semibold text-gray-700 text-xl">
                    Adresse:
                  </span>
                  <span className="ml-2 text-xl">{information.address}</span>
                </p>
                <p>
                  <span className="font-semibold text-gray-700 text-xl">
                    Ville:
                  </span>
                  <span className="ml-2 text-xl">{information.city}</span>
                </p>
                <p>
                  <span className="font-semibold text-gray-700 text-xl">
                    Code postal:
                  </span>
                  <span className="ml-2 text-xl">{information.postalCode}</span>
                </p>
                <p>
                  <span className="font-semibold text-gray-700 text-xl">
                    Pays:
                  </span>
                  <span className="ml-2 text-xl">{information.country}</span>
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4 text-[#D47A3B] border-b pb-2 ">
                Paiement
              </h2>
              <div className="space-y-3">
                <p>
                  <span className="font-semibold text-gray-700 text-xl">
                    Méthode:
                  </span>
                  <span className="ml-2 capitalize text-xl">
                    {payment.payment}
                  </span>
                </p>
                <p>
                  <span className="font-semibold text-gray-700 text-xl">
                    Date:
                  </span>
                  <span className="ml-2 text-xl">
                    {new Date().toLocaleDateString()}
                  </span>
                </p>
                <p>
                  <span className="font-semibold text-gray-700 text-xl">
                    Heure:
                  </span>
                  <span className="ml-2 text-xl">
                    {new Date().toLocaleTimeString()}
                  </span>
                </p>
                <p>
                  <span className="font-semibold text-gray-700 text-xl">
                    Référence:
                  </span>
                  <span className="ml-2 text-xl">
                    #{Math.floor(Math.random() * 1000000)}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-[#D47A3B] border-b pb-2">
              Détails de la Commande
            </h2>
            <div className="divide-y">
              {cart.map((item) => {
                const itemsPrice = parseFloat(
                  (item?.displayPrice * item?.amount).toFixed(2)
                );
                return (
                  <div key={item.id} className="py-4 flex items-center">
                    <img
                      src={item?.displayImage}
                      alt={item?.name}
                      className="w-16 h-16 object-cover rounded-md mr-4"
                    />
                    <div className="flex-grow flex items-center gap-4">
                      <h3 className="font-medium text-gray-800 m-0">
                        {item?.name}
                      </h3>
                      <p className="text-sm text-gray-500 m-0">
                        Quantité: {item?.amount}
                      </p>
                    </div>
                    <div className="text-right m-0 ">
                      <p className="font-medium m-0">{itemsPrice} DA</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Summary */}
          <div className="bg-[#D47A3B] rounded-lg shadow-lg p-6 text-white">
            <h2 className="text-2xl font-bold mb-4 border-b pb-2">
              Récapitulatif
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Sous-total:</span>
                <span>{total} DA</span>
              </div>
              <div className="flex justify-between">
                <span>Taxe (10%):</span>
                <span>{tax} DA</span>
              </div>
              <div className="flex justify-between">
                <span>Frais de livraison (13%):</span>
                <span>{deliveryFee} DA</span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-3 border-t mt-2">
                <span>Total:</span>
                <span>{totalAll} DA</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div variants={childVariants} className="text-center">
          <p className="text-gray-600 mb-6">
            Merci d'avoir choisi notre restaurant traditionnel. Nous espérons
            vous revoir bientôt!
          </p>
          <Link
            to="/"
            className="inline-block bg-[#D47A3B] hover:bg-[#c36a2b] text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300"
          >
            Retour à l'accueil
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Bill;
