// require("dotenv").config();

// const aj = (async () => {
//   const arcjetModule = await import("@arcjet/node");
//   const arcjet = arcjetModule.default;
//   const { shield, detectBot, tokenBucket } = arcjetModule;

//   return arcjet({
//     key: process.env.ARCJET_KEY,
//     characteristics: ["ip.src", "header.user-agent", "header.accept-language"],
//     rules: [
//       shield({ mode: "LIVE" }),
//       detectBot({
//         mode: process.env.NODE_ENV === "development" ? "DRY_RUN" : "LIVE",
//         allow: ["CATEGORY:SEARCH_ENGINE"],
//       }),
//       tokenBucket({
//         mode: "LIVE",
//         refillRate: 30,
//         interval: 5,
//         capacity: 20,
//       }),
//     ],
//   });
// })();

// module.exports = aj;

// lib/arcjet.js
// require("dotenv").config();

// const initializeArcjet = async () => {
//   try {
//     const arcjetModule = await import("@arcjet/node");
//     const { default: arcjet, shield, detectBot, tokenBucket } = arcjetModule;

//     process.env.ARCJET_ENV =
//       process.env.NODE_ENV === "production" ? "production" : "development";

//     return arcjet({
//       key: process.env.ARCJET_KEY,
//       characteristics: [
//         "ip.src",
//         "http.method",
//         "http.path",
//         "http.headers.accept",
//         "http.headers.user-agent",
//       ],
//       rules: [
//         shield({
//           mode: process.env.ARCJET_ENV === "development" ? "DRY_RUN" : "LIVE",
//         }),
//         detectBot({
//           mode: process.env.ARCJET_ENV === "development" ? "DRY_RUN" : "LIVE",
//           allow: ["CATEGORY:SEARCH_ENGINE"],
//         }),
//         tokenBucket({
//           mode: process.env.ARCJET_ENV === "development" ? "DRY_RUN" : "LIVE",
//           refillRate: 30,
//           interval: 5,
//           capacity: 20,
//         }),
//       ],
//     });
//   } catch (err) {
//     console.error("Arcjet init error:", err);
//     return { protect: () => ({ isDenied: () => false }) };
//   }
// };

// module.exports = initializeArcjet();
require("dotenv").config();

const aj = (async () => {
  const arcjetModule = await import("@arcjet/node");
  const arcjet = arcjetModule.default;
  const { shield, detectBot, tokenBucket } = arcjetModule;

  return arcjet({
    key: process.env.ARCJET_KEY,
    // characteristics: ["ip.src"],
    //  characteristics: [
    //         "ip.src",
    //         "http.method",
    //         "http.path",
    //         "http.headers.accept",
    //         "http.headers.user-agent",
    //       ],
    characteristics: ["ip.src", "header.user-agent", "header.accept-language"],

    rules: [
      shield({ mode: "LIVE" }),

      detectBot({
        mode: "LIVE",
        allow: ["CATEGORY:SEARCH_ENGINE"],
      }),
      tokenBucket({
        mode: "LIVE",
        refillRate: 30,
        interval: 5,
        capacity: 20,
      }),
    ],
  });
})();

module.exports = aj;
