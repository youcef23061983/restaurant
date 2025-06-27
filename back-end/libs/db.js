const { PrismaClient } = require("@prisma/client");

const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = db;
}

module.exports = db;
// const { PrismaClient } = require("@prisma/client");

// const prismaConfig = {
//   log:
//     process.env.NODE_ENV === "development"
//       ? ["query", "info", "warn", "error"]
//       : ["warn", "error"],
//   datasources: {
//     db: {
//       url:
//         process.env.DATABASE_URL +
//         (process.env.NODE_ENV === "production" ? "&sslmode=require" : ""),
//     },
//   },
// };

// const db = globalThis.prisma || new PrismaClient(prismaConfig);

// if (process.env.NODE_ENV !== "production") {
//   globalThis.prisma = db;
// }

// // Connection verification (for production)
// if (process.env.NODE_ENV === "production") {
//   db.$connect()
//     .then(() => console.log("Database connected successfully"))
//     .catch((error) => {
//       console.error("Database connection failed:", error);
//       process.exit(1);
//     });
// }

// module.exports = db;
