export const stripe = require("stripe")(process.env.STRIPE_SK!, {
  apiVersion: "2023-10-16",
});
