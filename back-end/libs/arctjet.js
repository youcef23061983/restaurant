require("dotenv").config();

const aj = (async () => {
  const arcjetModule = await import("@arcjet/node");
  const arcjet = arcjetModule.default;
  const { shield, detectBot, tokenBucket } = arcjetModule;

  return arcjet({
    key: process.env.ARCJET_KEY,
    characteristics: ["ip.src"],
    rules: [
      shield({ mode: "LIVE" }),

      detectBot({
        mode: process.env.NODE_ENV === "development" ? "DRY_RUN" : "LIVE",
        // mode: "LIVE",
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

// (async () => {
//   const arcjetModule = await import("@arcjet/node");
//   const arcjet = arcjetModule.default;
//   const { shield, detectBot, tokenBucket } = arcjetModule;

//   const aj = arcjet({
//     key: process.env.ARCJET_KEY,
//     characteristics: ["ip.src"],
//     rules: [
//       // shield protects your app from common attacks e.g. SQL injection, XSS, CSRF attacks
//       shield({ mode: "LIVE" }),
//       detectBot({
//         mode: "LIVE",
//         // block all bots except search engines
//         allow: [
//           "CATEGORY:SEARCH_ENGINE",
//           // see the full list at https://arcjet.com/bot-list
//         ],
//       }),
//       // rate limiting
//       tokenBucket({
//         mode: "LIVE",
//         refillRate: 30,
//         interval: 5,
//         capacity: 20,
//       }),
//     ],
//   });
//   module.exports = aj;
// })();
