const jwt = require("jsonwebtoken");
const db = require("../libs/db.js");
const authorization = async (req, res, next) => {
  try {
    const authHeader = req?.headers?.authorization;
    console.log("Authorization header:", authHeader);

    if (!authHeader || !authHeader?.startsWith("Bearer")) {
      return res
        .status(401)
        .json({ status: "auth_failed", message: "Authentication failed" });
    }

    const token = authHeader?.split(" ")[1];
    console.log("Received token:", token);

    if (!token) {
      console.log("No token provided");
      return res
        .status(401)
        .json({ message: "Unauthorized - No token provided" });
    }

    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded);
    //  i have to parsIn to let prisma read the id not to throw an error

    const userId = parseInt(decoded?.userId);
    if (!userId) {
      console.log("Invalid token: no user_id");
      return res.status(401).json({ message: "Unauthorized - Invalid token" });
    }

    // Query the database to find the user
    const userResult = await db.tbluser.findUnique({
      where: { id: userId },
      select: { id: true, username: true, email: true, user_role: true },
    });

    if (!userResult) {
      console.log("User not found");
      return res.status(401).json({ message: "Unauthorized - User not found" });
    }
    console.log("this is your user", userResult);

    // Attach user information to the request object
    req.user = userResult;
    next();
  } catch (error) {
    console.error("Authorization error:", error.message);
    return res
      .status(403)
      .json({ message: "Forbidden - Invalid or expired token" });
  }
};

module.exports = { authorization };
