require("dotenv").config();

const aj = (async () => {
  const arcjetModule = await import("@arcjet/node");
  const arcjet = arcjetModule.default;
  const { shield, detectBot, tokenBucket } = arcjetModule;

  return arcjet({
    key: process.env.ARCJET_KEY,
    characteristics: ["ip.src", "header.user-agent", "header.accept-language"],
    rules: [
      shield({ mode: "LIVE" }),
      detectBot({
        mode: process.env.NODE_ENV === "development" ? "DRY_RUN" : "LIVE",
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
