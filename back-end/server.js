// this.post("/login", (schema, request) => {
//   const { email, password } = JSON.parse(request.requestBody);
//   const foundUser = schema.users.findBy({ email, password });

//   if (!foundUser) {
//     return new Response(
//       401,
//       {},
//       { message: "No user with those credentials found!" }
//     );
//   }

//   foundUser.password = undefined;
//   return {
//     user: foundUser,
//     token: "Enjoy your pizza, here's your tokens.",
//   };
// });
// const jsonServer = require("json-server");
// const server = jsonServer.create();
// const router = jsonServer.router("hotel.json");
// const middlewares = jsonServer.defaults();

// server.use(middlewares);
// server.use((req, res, next) => {
//   console.log("Request received");
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

// server.use(router);
// server.listen(3000, () => {
//   console.log("JSON Server is running");
// });

const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("hotel.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);

// Custom /login route
server.post("/login", (req, res) => {
  // Parse the request body
  const { email, password } = req.body;

  // Access users from the database
  const db = router.db; // Access lowdb instance
  const foundUser = db.get("users").find({ email, password }).value();

  if (!foundUser) {
    return res.status(401).json({
      message: "No user with those credentials found!",
    });
  }

  // Do not send the password back
  const { password: _, ...userWithoutPassword } = foundUser;

  return res.json({
    user: userWithoutPassword,
    token: "Enjoy your pizza, here's your tokens.",
  });
});

// CORS Headers
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Use the default JSON Server router
server.use(router);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});
