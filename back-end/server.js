require("dotenv").config();
const express = require("express");
const app = express();
app.set("trust proxy", true);

const PORT = process.env.PORT || 3000;
const cors = require("cors");
const morgan = require("morgan");
const menuRoutes = require("./routes/menu.js");
const galleryRoutes = require("./routes/gallery.js");
const authRoutes = require("./routes/authUser.js");
const reservationRoutes = require("./routes/reservation.js");
const ordreRoutes = require("./routes/ordre.js");
const aj = require("./libs/arctjet.js");
const helmet = require("helmet");

const stripe = require("stripe")(process.env.VITE_STRIPE_SECRET_KEY);

// app.use(
//   cors({
//     origin: ["http://localhost:5173", "https://elbahjarestaurant.vercel.app"],
//     methods: ["GET", "POST", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//     credentials: true,
//     optionsSuccessStatus: 200,
//   })
// );
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:4173", // ✅ Vite preview
  "https://elbahjarestaurant.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    optionsSuccessStatus: 200,
  })
);
app.disable("x-powered-by"); // Remove Express header

app.use(express.json({ limit: "10kb" })); // Limit request size
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev")); // Colorful logs
} else {
  app.use(morgan("tiny")); // Minimal logs
}
app.use(helmet());

app.use("/menu", menuRoutes);
app.use("/gallery", galleryRoutes);
app.use("/auth", authRoutes);
app.use("/reservations", reservationRoutes);
app.use("/ordre", ordreRoutes);
app.use(async (req, res, next) => {
  // 🛑 Skip Arcjet on /health
  if (req.path === "/health" || req.path === "/") return next();
  if (req.path.startsWith("/assets")) return next();
  console.log("Client IP:", req.ip);
  console.log("User-Agent:", req.headers["user-agent"]);
  console.log("Accept-Language:", req.headers["accept-language"]);
  console.log("Request Path:", req.path);

  try {
    const ajPromise = await aj;

    const decision = await ajPromise.protect(req, {
      requested: 1, // specifies that each request consumes 1 token
    });

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        res.status(429).json({ error: "Too Many Requests" });
      } else if (decision.reason.isBot()) {
        res.status(403).json({ error: "Bot access denied" });
      } else {
        res.status(403).json({ error: "Forbidden" });
      }
      return;
    }

    // check for spoofed bots
    if (
      decision.results.some(
        (result) => result.reason.isBot() && result.reason.isSpoofed()
      )
    ) {
      res.status(403).json({ error: "Spoofed bot detected" });
      return;
    }

    next();
  } catch (error) {
    console.log("Arcjet error", error);
    next(error);
  }
});

app.post("/create-payment-intent", async (req, res) => {
  const { totalInCents } = req.body;

  console.log("Received totalInCents:", totalInCents);

  if (!totalInCents || totalInCents <= 0) {
    return res.status(400).json({ error: "Invalid amount" });
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalInCents,
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
app.get("/", (req, res) => {
  res.send("API is running ✅");
});
app.listen(PORT, () => {
  console.log("server is running on port", PORT);
});
