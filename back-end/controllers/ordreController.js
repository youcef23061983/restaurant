const db = require("../libs/db.js");
const getOrdre = async (req, res) => {
  try {
    const orders = await db.order.findMany({
      orderBy: {
        created_at: "desc",
      },
    });
    res.json(orders);
  } catch (error) {
    console.error("Fetching orders failed:", error.message);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};

const postOrdre = async (req, res) => {
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
    delivery,
    total,
    sellingMeals,
  } = req.body;
  console.log("payment", payment);

  try {
    // ✅ Prisma transaction
    const result = await db.$transaction(async (prisma) => {
      // 1. Create order
      const order = await prisma.order.create({
        data: {
          full_name: fullName,
          address,
          city,
          postal_code: postalCode,
          country,
          payment,
          tbluser_id,
          subtotal,
          tax,
          delivery,
          total,
          amount,
        },
      });

      // 2. Create all order items
      await prisma.orderItem.createMany({
        data: sellingMeals.map((item) => ({
          order_id: order.id,
          product_id: item.id,
          product_name: item.product_name,
          amount: item.amount,
          unit_price: item.unitPrice,
          total_price: item.totalPrice,
        })),
      });

      return order;
    });

    res.status(201).json({
      success: true,
      orderId: result.id,
    });
  } catch (error) {
    console.error("Transaction failed:", error);
    res.status(500).json({
      error: "Order processing failed",
      details:
        process.env.NODE_ENV !== "production" ? error.message : undefined,
    });
  }
};

module.exports = { postOrdre, getOrdre };
