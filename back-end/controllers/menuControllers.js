require("dotenv").config();
const pool = require("../libs/db.js");

const getMenu = async (req, res) => {
  try {
    const menu = await pool.query("select * from menu");
    res.json(menu.rows);
  } catch (error) {
    console.log(error.message);
  }
};

const getSingleMenu = async (req, res) => {
  try {
    const { id } = req.params;
    const singleMenu = await pool.query("select * from menu where id=$1", [id]);
    res.json(singleMenu.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { getMenu, getSingleMenu };
