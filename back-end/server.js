const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("menu.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use((req, res, next) => {
  console.log("Request received");
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
this.post("/login", (schema, request) => {
  const { email, password } = JSON.parse(request.requestBody);
  const foundUser = schema.users.findBy({ email, password });

  if (!foundUser) {
    return new Response(
      401,
      {},
      { message: "No user with those credentials found!" }
    );
  }

  foundUser.password = undefined;
  return {
    user: foundUser,
    token: "Enjoy your pizza, here's your tokens.",
  };
});

server.use(router);
server.listen(3000, () => {
  console.log("JSON Server is running");
});
