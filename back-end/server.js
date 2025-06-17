// const jsonServer = require("json-server");
// const server = jsonServer.create();
// const router = jsonServer.router("menu.json");
// const middlewares = jsonServer.defaults();

// server.use(middlewares);

// // Custom /login route
// server.post("/login", (req, res) => {
//   // Parse the request body
//   const { email, password } = req.body;

//   // Access users from the database
//   const db = router.db; // Access lowdb instance
//   const foundUser = db.get("users").find({ email, password }).value();

//   if (!foundUser) {
//     return res.status(401).json({
//       message: "No user with those credentials found!",
//     });
//   }

//   // Do not send the password back
//   const { password: _, ...userWithoutPassword } = foundUser;

//   return res.json({
//     user: userWithoutPassword,
//     token: "Enjoy your pizza, here's your tokens.",
//   });
// });

// // CORS Headers
// server.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Methods",
//     "GET, POST, PUT, DELETE, PATCH, OPTIONS"
//   );
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

// // Use the default JSON Server router
// server.use(router);

// server.use(router);
// server.listen(3000, () => {
//   console.log("JSON Server is running");
// });

require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT;
const cors = require("cors");
const morgan = require("morgan");
const menuRoutes = require("./routes/menu.js");
const galleryRoutes = require("./routes/gallery.js");
const authRoutes = require("./routes/authUser.js");
const reservationRoutes = require("./routes/reservation.js");
const stripe = require("stripe")(process.env.VITE_STRIPE_SECRET_KEY);

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    optionsSuccessStatus: 200,
  })
);
app.use(express.json());
app.use(morgan("dev"));
app.use("/menu", menuRoutes);
app.use("/gallery", galleryRoutes);
app.use("/auth", authRoutes);
app.use("/reservations", reservationRoutes);
app.post("/create-payment-intent", async (req, res) => {
  const { total } = req.body;
  console.log("total", total);
  console.log(typeof total);
  console.log("new totel", Math.round(total * 100));

  if (!total || total <= 0) {
    return res.status(400).json({ error: "Invalid amount" });
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(total * 100), // Properly round to nearest integer
      currency: "usd",

      automatic_payment_methods: { enabled: true },
    });
    res.json({ clientSecret: paymentIntent.client_secret }); // Send back clientSecret
  } catch (error) {
    res.status(400).json({ error: error.message }); // Handle any errors
  }
});

app.get("/config", (req, res) => {
  res.json({
    publishableKey: process.env.VITE_STRIPE_PUBLIC_KEY, // Send as JSON object
  });
});

app.post("/retrieve-customer-data", async (req, res) => {
  try {
    const { paymentIntentId, cart, information, formUser } = req.body;
    console.log("retrieve paymentintentid", paymentIntentId);
    console.log("retrieve cart", cart);
    console.log("retrieve information", information);
    console.log("retieve formuser", formUser);

    if (!paymentIntentId) {
      return res.status(400).json({ error: "Payment intent ID is required" });
    }

    const paymentIntent = await stripe.paymentIntents.retrieve(
      paymentIntentId,
      {
        expand: ["payment_method"],
      }
    );

    // Combine Stripe data with form data
    const customerData = {
      amount: (paymentIntent.amount / 100).toFixed(2),
      currency: paymentIntent.currency.toUpperCase(),
      transactionId: paymentIntent.id,
      paymentMethod: paymentIntent.payment_method?.card?.brand || "card",
      last4: paymentIntent.payment_method?.card?.last4 || "****",
      created: new Date(paymentIntent.created * 1000).toISOString(),
      fullName: information?.fullName || "Not provided",
      street: information?.address || "",
      email: formUser?.email || "Not provided",
      email: formUser.email || "Not provided",
      country: information?.country || "N/A",
      city: information?.city || "",
      postalCode: information?.postalCode || "",
      transactionId: paymentIntent.id,
      postalCode:
        paymentIntent.payment_method?.billing_details?.address?.postal_code ||
        "",

      phone: paymentIntent.payment_method?.billing_details?.phone || "",
      paymentMethod: paymentIntent.payment_method?.card?.brand || "Unknown",
      last4: paymentIntent.payment_method?.card?.last4 || "****",
      currency: paymentIntent.currency.toUpperCase() || "USD",
      created:
        new Date(paymentIntent.created * 1000).toISOString() ||
        new Date().toISOString(),
      // customer: {
      //   name:
      //     information?.fullName ||
      //     paymentIntent.payment_method?.billing_details?.name,
      //   email:
      //     formUser?.email ||
      //     paymentIntent.payment_method?.billing_details?.email,
      //   phone:
      //     information?.phone ||
      //     paymentIntent.payment_method?.billing_details?.phone,
      //   address: {
      //     street:
      //       information?.address ||
      //       paymentIntent.payment_method?.billing_details?.address?.line1,
      //     city:
      //       information?.city ||
      //       paymentIntent.payment_method?.billing_details?.address?.city,
      //     state:
      //       information?.state ||
      //       paymentIntent.payment_method?.billing_details?.address?.state,
      //     postalCode:
      //       information?.postalCode ||
      //       paymentIntent.payment_method?.billing_details?.address?.postal_code,
      //     country:
      //       information?.country ||
      //       paymentIntent.payment_method?.billing_details?.address?.country,
      //   },
      // },
      items: cart,
    };

    res.json(customerData);
  } catch (error) {
    console.error("Retrieval error:", error);
    res.status(500).json({
      error: "Failed to retrieve customer data",
      details: error.message,
    });
  }
});
app.listen(PORT, () => {
  console.log("server is running on port", PORT);
});
