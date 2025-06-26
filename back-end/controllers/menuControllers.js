require("dotenv").config();
const db = require("../libs/db.js");

const getMenu = async (req, res) => {
  try {
    const menu = await db.menu.findMany();
    res.json(menu);
  } catch (error) {
    console.log(error.message);
  }
};

const getSingleMenu = async (req, res) => {
  try {
    const { id } = req.params;

    const singleMenu = await db.menu.findUnique({
      where: { id: parseInt(id) },
    });

    if (!singleMenu) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    res.status(200).json(singleMenu);
  } catch (error) {
    console.error("Error fetching single menu item:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { getMenu, getSingleMenu };
