const express = require("express");
const router = express.Router();
const { postOrdre, getOrdre } = require("../controllers/ordreController");

router.get("/", getOrdre);
router.post("/", postOrdre);

module.exports = router;
