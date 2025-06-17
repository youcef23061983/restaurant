require("dotenv").config();
const pool = require("../libs/db.js");

const getReservation = async (req, res) => {
  try {
    const reservations = await pool.query("select * from reservations");
    res.json(reservations.rows);
  } catch (error) {
    console.log(error.message);
  }
};

const postReservation = async (req, res) => {
  try {
    const {
      datetime,
      capacity,
      customer_name,
      customer_phone,
      customer_email,
      customer_id,
    } = req.body;

    // Validate input
    if (!datetime || !capacity) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Parse the datetime string from frontend
    const reservationDateTime = new Date(datetime);

    // Validate the date
    if (isNaN(reservationDateTime.getTime())) {
      return new Response(JSON.stringify({ error: "Invalid date format" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Insert into database
    const result = await pool.query(
      `INSERT INTO reservations (
        datetime, 
        capacity,
        customer_name,
        customer_phone,
        customer_email,
        customer_id
       ) VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [
        reservationDateTime.toISOString(), // Just the full timestamp
        Number(capacity),
        customer_name,
        customer_phone,
        customer_email || null,
        customer_id || null,
      ]
    );

    res.status(200).json({
      status: "success",
      message: "Login successfully",
      user: result.rows[0],
    });
  } catch (error) {
    if (error.code === "23505") {
      // Unique violation
      return res.status(409).json({
        error: "This time slot is already booked for the selected table size",
      });
    }
    console.error("Reservation error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
module.exports = { getReservation, postReservation };
