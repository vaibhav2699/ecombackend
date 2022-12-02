const express = require("express");
const router = express.Router();
const Razorpay = require("razorpay");
const shortid = require("shortid");

const razorpay = new Razorpay({
  key_id: "rzp_test_XqUGrjRWQI1oVV",
  key_secret: "SWZLip65g7H4Rh8clmYRDj50",
});

router.post("/", async (req, res) => {
  const payment_capture = 1;
  const options = {
    amount: req.body.amount * 100,
    currency: "INR",
    receipt: shortid.generate(),
    payment_capture: payment_capture,
  };

  try {
    const response = await razorpay.orders.create(options);

    if (response) {
      return res.status(200).json({
        success: true,
        message: "response successfull",
        data: response,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "response not successfull",
        data: null,
      });
    }
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

module.exports = router;

// razorpay.orders.create({
//     amount: 50000,
//     currency: "INR",
//     receipt: "receipt#1",
//      payment_capture: 1,
//     notes: {
//       key1: "value3",
//       key2: "value2"
//     }
//   })
