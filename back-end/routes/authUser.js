const express = require("express");
const {
  signupUser,
  signinUser,
  userAuthorization,
} = require("../controllers/authControllers");

const { authorization } = require("../middleware/authorization.js");

const router = express.Router();
// signup:
router.post("/signup", signupUser);
// signin:
router.post("/signin", signinUser);

router.get("/verify", authorization, userAuthorization);

module.exports = router;
