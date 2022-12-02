const express = require("express");
const router = express.Router();
const OrderService = require("../../Services/Order/order.service");
const OrderModal = require("../../Services/Order/order.modal");

router.post("/", async (req, res) => {
  try {
    let { success, message, data } = await OrderService.create(req.body);

    if (success) {
      return res.status(200).json({ success, message, data });
    } else {
      return res.status(400).json({ success, message, data });
    }
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    let { success, message, data } = await OrderService.update(
      req.params.id,
      req.body
    );
    if (success) {
      return res.status(200).json({ success, message, data });
    } else {
      return res.status(400).json({ success, message, data });
    }
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

router.post("/list", async (req, res) => {
  try {
    let { success, message, data } = await OrderService.list(
      req.body.where,
      req.body.pagination
    );

    if (success) {
      return res.status(200).json({ success, message, data });
    } else {
      return res.status(400).json({ success, message, data });
    }
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

router.post("/search", async (req, res) => {
  try {
    let searchText = req.body.searchText;
    const result = await OrderModal.find({
      $or: [{ paymentId: { $regex: ".*" + searchText + ".*", $options: "i" } }],
    });
    if (result.length > 0) {
      return res.status(200).json({
        success: true,
        message: "data found successfully",
        data: result,
      });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "data  not found", data: [] });
    }
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

module.exports = router;
