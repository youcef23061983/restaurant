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

app.use(
  cors({
    origin: "http://localhost:5173", // Your frontend origin
    credentials: true, // Allow credentials (cookies)
    optionsSuccessStatus: 200, // Some legacy browsers choke on 204
  })
);
app.use(express.json());
app.use(morgan("dev"));
app.use("/menu", menuRoutes);
app.use("/gallery", galleryRoutes);
app.use("/auth", authRoutes);

app.listen(PORT, () => {
  console.log("server is running on port", PORT);
});
