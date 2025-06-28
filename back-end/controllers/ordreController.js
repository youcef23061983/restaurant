require("dotenv").config();
const pool = require("../libs/db.js");

const getOrdre = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM orders ORDER BY created_at DESC"
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Fetching orders failed:", error.message);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};

const postOrdre = async (req, res) => {
  const client = await pool.connect();

  const {
    fullName,
    address,
    city,
    postalCode,
    country,
    payment,
    amount,
    tbluser_id,
    subtotal,
    tax,
    total,
    sellingMeals,
  } = req.body;

  try {
    // ✅ Start a transaction
    await client.query("BEGIN");

    // 1. Insert into orders
    const orderRes = await client.query(
      `INSERT INTO orders (
        full_name, address, city, postal_code, country,
        payment, tbluser_id, subtotal, tax, total,amount
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10,$11)
      RETURNING id`,
      [
        fullName,
        address,
        city,
        postalCode,
        country,
        payment,
        tbluser_id,
        subtotal,
        tax,
        total,
        amount,
      ]
    );

    const orderId = orderRes.rows[0].id;

    // 2. Insert into order_items
    for (const item of sellingMeals) {
      await client.query(
        `INSERT INTO order_items (
          order_id, product_id, product_name, amount, unit_price, total_price
        ) VALUES ($1, $2, $3, $4, $5, $6)`,
        [
          orderId,
          item.id,
          item.product_name,
          item.amount,
          item.unitPrice,
          item.totalPrice,
        ]
      );
    }

    // ✅ Commit if all successful
    await client.query("COMMIT");

    res.status(201).json({ message: "Order and items saved successfully." });
  } catch (error) {
    // ❌ Rollback on any error
    await client.query("ROLLBACK");
    console.error("Transaction failed:", error.message);
    res.status(500).json({ error: "Transaction failed. Order not saved." });
  } finally {
    client.release();
  }
};

module.exports = { postOrdre, getOrdre };
