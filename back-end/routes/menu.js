const express = require("express");
const { getMenu, getSingleMenu } = require("../controllers/menuControllers.js");

const router = express.Router();

router.get("/", getMenu);
router.get("/:id", getSingleMenu);

module.exports = router;
