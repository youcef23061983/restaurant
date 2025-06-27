// const Pool = require("pg").Pool;
// const pool = new Pool({
//   user: "postgres",
//   host: "localhost",
//   password: "Youyou2025",
//   port: 5432,
//   database: "restaurant",
// });
// module.exports = pool;
// require("dotenv").config();
const { PrismaClient } = require("@prisma/client");

const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = db;
}

module.exports = db;
