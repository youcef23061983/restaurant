// require("dotenv").config();
const db = require("../libs/db.js");

const getGallery = async (req, res) => {
  try {
    const gallery = await db.gallery.findMany();
    res.json(gallery);
  } catch (error) {
    console.log(error.message);
  }
};
module.exports = getGallery;
