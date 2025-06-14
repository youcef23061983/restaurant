require("dotenv").config();
const pool = require("../libs/db.js");

const getGallery = async (req, res) => {
  try {
    const gallery = await pool.query("select * from gallery");
    res.json(gallery.rows);
  } catch (error) {
    console.log(error.message);
  }
};
module.exports = getGallery;
