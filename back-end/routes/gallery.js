const express = require("express");
const getGallery = require("../controllers/galleryController.js");

const router = express.Router();

router.get("/", getGallery);

module.exports = router;
