const express = require("express");
const router = express.Router();

const stripe = require("stripe")(
  "sk_test_51LSJbrSHKwWbek0R6esxrRKpNKGamIvumCb53pCxkbJ69EqQ7ZgLDYgIZm6FTsI8qggGgUaPyTWrn5OB83SBuSJU009XnqRQWT"
);

router.post("/create-payment-intent", async (req, res) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "inr",
    automatic_payment_methods: {
      enabled: true,
    },
  });
  res.status(200).json({
    success: true,
    message: "Client Secret Key",
    data: paymentIntent.client_secret,
  });
});

module.exports = router;
