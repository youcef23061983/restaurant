const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  password: "Youyou2025",
  port: 5432,
  database: "restaurant",
});
module.exports = pool;
