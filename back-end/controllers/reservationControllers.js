// require("dotenv").config();
const db = require("../libs/db.js");

const getReservation = async (req, res) => {
  try {
    const reservation = await db.reservation.findMany();
    res.json(reservation);
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

    // Validate required fields
    if (!datetime || !capacity) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Parse and validate datetime
    const reservationDateTime = new Date(datetime);
    if (isNaN(reservationDateTime.getTime())) {
      return res.status(400).json({ error: "Invalid date format" });
    }

    // Insert reservation into the database
    const result = await db.reservation.create({
      data: {
        datetime: reservationDateTime.toISOString(),
        capacity: Number(capacity),
        customer_name,
        customer_phone,
        customer_email: customer_email || null,
        customer_id: customer_id || null,
      },
    });

    res.status(201).json({
      status: "success",
      message: "Reservation created successfully",
      reservation: result,
    });
  } catch (error) {
    if (error.code === "P2002") {
      // Prisma unique constraint violation
      return res.status(409).json({
        error: "This time slot is already booked for the selected table size",
      });
    }

    console.error("Reservation error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { getReservation, postReservation };
