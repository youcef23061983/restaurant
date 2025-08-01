const db = require("../libs/db.js");
const { hashPassword, comparePassword, createJWT } = require("../libs/index");

const signupUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    if (!username || !email || !password) {
      return res.status(400).json({ message: "Please fill all fields" });
    }
    const userExist = await db.tbluser.findUnique({ where: { email } });
    if (userExist) {
      return res.status(409).json({ message: "email already exists" });
    }
    const hashedPassword = await hashPassword(password);
    console.log("Password received:", password);

    const user = await db.tbluser.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });
    const token = createJWT(user.id);
    res.cookie("token", token, {
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in milliseconds
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development", // Set to true if using HTTPS
      sameSite: "strict", // CSRF protection
    });

    delete user.password;
    res.status(201).json({
      status: "success",
      message: "User account created successfully",
      user,
      token,
    });
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({
      message: "internal server error",
    });
  }
};

const signinUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Email received:", email);
    console.log("Password received:", password);

    if (!email || !password) {
      return res.status(401).json({
        status: "failed",
        message: "Provide Required Fields!",
      });
    }

    const user = await db.tbluser.findUnique({ where: { email } });

    if (!user) {
      return res.status(401).json({
        status: "failed",
        error: "Invalid credentials",
        message: "No account found with this email, please sign up.",
      });
    }

    const isMatch = await comparePassword(password, user?.password);

    if (!isMatch) {
      return res.status(401).json({
        status: "failed",
        message: "Invalid email or password",
      });
    }

    const token = createJWT(user.id);
    console.log("this is your token", token);
    res.cookie("token", token, {
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
    });

    delete user.password;

    res.status(200).json({
      status: "success",
      message: "Login successfully",
      user,
      token,
    });
  } catch (error) {
    console.error("Login error:", error.message);

    if (error.code === "ECONNREFUSED") {
      return res.status(503).json({
        error: "Service unavailable",
        message: "Database connection failed",
      });
    }

    return res.status(500).json({
      error: "Server error",
      message: "Please try again later",
    });
  }
};

const userAuthorization = (req, res) => {
  const { id } = req.user;
  const token = createJWT(req.user.id);
  res.cookie("token", token, {
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in milliseconds
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development", // Set to true if using HTTPS
    sameSite: "strict", // CSRF protection
  });
  try {
    res.json({
      user: {
        id: req.user.id,
        username: req.user.username,
        email: req.user.email,
        user_role: req.user.user_role,
      },
      token,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  signupUser,
  userAuthorization,
  signinUser,
};
