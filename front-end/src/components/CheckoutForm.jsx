import { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { AppContext } from "../data/AppProvider";
import { useContext } from "react";

const CheckoutForm = ({ onSuccess }) => {
  const { cart, information, formUser, amount, total } = useContext(AppContext);

  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState(null);
  const [customerData, setCustomerData] = useState(null);
  const tax = parseFloat((total * 0.1).toFixed(2));
  const totalAll = parseFloat((total + tax).toFixed(2));
  const url = import.meta.env.VITE_PUBLIC_MENU_URL;
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!elements || !stripe) {
      setErrorMessage("Payment system not ready. Please try again.");
      return;
    }

    setIsProcessing(true);
    setErrorMessage(null);
    setMessage(null);

    try {
      const { error: submitError } = await elements.submit();
      if (submitError) throw submitError;

      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/bill`,
        },
        redirect: "if_required",
      });

      if (error) throw error;

      if (paymentIntent?.status === "succeeded") {
        const response = await fetch(`${url}/retrieve-customer-data`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            paymentIntentId: paymentIntent.id,
            cart,
            information,
            formUser,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Order processing failed");
        }

        const fullCustomerData = await response.json();
        setCustomerData(fullCustomerData);
        setMessage("Payment successful! Order completed 🎉");
        onSuccess();
      }
    } catch (err) {
      console.error("Payment error:", err);
      setErrorMessage(err.message || "Payment processing failed");
    } finally {
      setIsProcessing(false);
    }
  };
  //   {
  //     4000 0027 6000 3184 → Returns complete US address

  // 4000 0036 0000 0005 → Returns UK address format
  //   4000 0025 0000 3155 - Requires full 3D Secure flow

  // 4000 0000 0000 3220 - Triggers address verification

  // 4000 0084 0000 1629 → Requires ZIP code verification
  //   }
  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <PaymentElement
          options={{
            fields: {
              billingDetails: "auto",
            },
          }}
          className="border border-[#D47A3B] rounded-lg p-4 bg-white"
        />
        <button
          type="submit"
          disabled={isProcessing}
          className={`w-full py-3 px-4 rounded-lg text-white font-bold ${
            isProcessing ? "bg-[#D47A3B]/70" : "bg-[#D47A3B] hover:bg-[#c36a2b]"
          } transition-colors duration-300`}
        >
          {isProcessing ? "Processing..." : `Pay ${totalAll} DA`}
        </button>

        {errorMessage && (
          <div className="text-red-600 mt-2 p-2 bg-red-50 rounded-lg">
            {errorMessage}
          </div>
        )}
        {message && (
          <div className="text-green-700 mt-2 p-2 bg-green-50 rounded-lg">
            {message}
          </div>
        )}
      </form>

      {customerData && (
        <div className="bg-[#F9FCE1] rounded-lg shadow-md border border-[#D47A3B] overflow-hidden">
          <div className="bg-[#D47A3B] px-6 py-4 flex justify-between items-center">
            <div className="flex items-center">
              <div className="mr-3 bg-[#F9FCE1] p-1 rounded">
                <svg
                  className="w-8 h-8 text-[#D47A3B]"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#F9FCE1]">
                  Payment Receipt
                </h3>
                <p className="text-[#F5F0EA] text-sm mt-1">
                  {new Date(customerData.created).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
            <button
              onClick={() => window.print()}
              className="bg-[#F9FCE1] hover:bg-[#F5F0EA] text-[#D47A3B] font-medium py-2 px-4 rounded-md transition-colors duration-200 flex items-center"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
                />
              </svg>
              Download PDF
            </button>
          </div>

          <div className="p-6">
            <div className="mb-6">
              <h4 className="text-md font-semibold text-[#D47A3B] mb-3 border-b pb-2 border-[#D47A3B]">
                Customer Information
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600 text-sm">Full Name</p>
                  <p className="font-medium break-all text-gray-800 text-xl">
                    {customerData.fullName || "-"}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Email</p>
                  <p className="font-medium break-all text-gray-800 text-xl">
                    {customerData.email || "-"}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Phone</p>
                  <p className="font-medium text-gray-800 text-xl">
                    {customerData.phone || "-"}
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-md font-semibold text-[#D47A3B] mb-3 border-b pb-2 border-[#D47A3B]">
                Order Summary
              </h4>

              <div className="border border-[#D47A3B] rounded-lg overflow-hidden">
                <div className="hidden sm:grid grid-cols-12 bg-[#D47A3B] px-4 py-2 text-xs font-medium text-[#F9FCE1] uppercase tracking-wider">
                  <div className="col-span-6">Item</div>
                  <div className="col-span-2 text-center">Qty</div>
                  <div className="col-span-2 text-center">Unit Price</div>
                  <div className="col-span-2 text-center">Total</div>
                </div>

                <div className="divide-y divide-[#D47A3B]/30">
                  {customerData?.items?.map((item, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-1 sm:grid-cols-12 p-4 hover:bg-[#F5F0EA] transition-colors"
                    >
                      <div className="col-span-6 flex items-center mb-2 sm:mb-0">
                        <div className="flex-shrink-0 h-12 w-12 bg-[#F5F0EA] rounded-md overflow-hidden mr-3">
                          <img
                            src={item?.image[0] || "/placeholder-product.jpg"}
                            alt={item?.name}
                            loading="lazy"
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {item?.name}
                          </p>
                          <p className="text-xs text-gray-500 sm:hidden">
                            {item?.displayPrice * item?.amount} DA
                          </p>
                        </div>
                      </div>

                      <div className="col-span-2 flex items-center justify-center">
                        <span className="text-sm text-gray-700">
                          {item?.amount}
                        </span>
                      </div>

                      <div className="col-span-2 flex items-center justify-center">
                        <span className="text-sm text-gray-700">
                          {item?.displayPrice} DA{" "}
                        </span>
                      </div>

                      <div className="col-span-2 flex items-center justify-center">
                        <span className="text-sm font-medium text-gray-800">
                          {item?.displayPrice * item?.amount} DA{" "}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-md font-semibold text-[#D47A3B] mb-3 border-b pb-2 border-[#D47A3B]">
                Payment Details
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600 text-sm">Payment Method</p>
                  <div className="flex items-center mt-1">
                    <div className="bg-[#D47A3B]/10 hover:bg-[#D47A3B]/20 text-[#D47A3B] px-2 py-1 rounded text-xs font-medium mr-2 transition-colors duration-200">
                      {customerData.paymentMethod || "Card"}
                    </div>
                    <span className="font-mono text-gray-800">
                      •••• {customerData.last4}
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Montant</p>
                  <p className="text-xl font-bold text-[#D47A3B]">{amount}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Taxe </p>
                  <p className="text-xl font-bold text-[#D47A3B]">{tax} DA</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Total </p>
                  <p className="text-xl font-bold text-[#D47A3B]">
                    {totalAll} DA
                  </p>
                </div>
                <div className="break-all">
                  <p className="text-gray-600 text-sm">Transaction ID</p>
                  <p className="font-mono text-sm text-gray-500">
                    {customerData.transactionId}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Status</p>
                  <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 hover:bg-green-200 text-green-800 transition-colors duration-200">
                    Completed
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-md font-semibold text-[#D47A3B] mb-3 border-b pb-2 border-[#D47A3B]">
                Order Address
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600 text-xl">Street</p>
                  <p className="font-medium text-gray-800 text-xl">
                    {customerData.street || "-"}
                  </p>
                  {customerData.address?.line2 && (
                    <p className="font-medium text-gray-800 text-xl">
                      {customerData.address.line2}
                    </p>
                  )}
                </div>
                <div>
                  <p className="text-gray-600 text-sm">City/State/Zip</p>
                  <p className="font-medium text-gray-800 text-xl">
                    {customerData.city || "-"}
                    {customerData.state ? `, ${customerData.state}` : ""}{" "}
                    {customerData.postalCode}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Country</p>
                  <p className="font-medium text-gray-800 text-xl">
                    {customerData.country || "-"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#F5F0EA] px-6 py-3 border-t border-[#D47A3B]">
            <p className="text-xs text-gray-600 text-center">
              Thank you for your purchase! A receipt has been sent to{" "}
              {customerData.email || "your email"}
            </p>
            <div className="flex justify-center mt-2 space-x-4">
              <button className="text-xs text-[#D47A3B] hover:text-[#c36a2b] hover:underline transition-colors duration-200">
                Print Receipt
              </button>
              <button className="text-xs text-[#D47A3B] hover:text-[#c36a2b] hover:underline transition-colors duration-200">
                Contact Support
              </button>
              <button className="text-xs text-[#D47A3B] hover:text-[#c36a2b] hover:underline transition-colors duration-200">
                Order Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutForm;
