const express = require("express");
const {
  getReservation,
  postReservation,
} = require("../controllers/reservationControllers");

const router = express.Router();

router.get("/", getReservation);
router.post("/", postReservation);

module.exports = router;
