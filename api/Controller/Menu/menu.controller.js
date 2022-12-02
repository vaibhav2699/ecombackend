const express = require("express");
const router = express.Router();
const MenuService = require("../../Services/Menu/menu.service");
const menuModal = require("../../Services/Menu/menu.modal");

router.post("/", async (req, res) => {
  try {
    let { success, message, data } = await MenuService.create(req.body);
    if (success) {
      return res.status(200).json({ success, message, data });
    } else {
      return res.status(400).json({ success, message, data });
    }
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

router.put("/:id", async (req, res) => {
  try {
    let { success, message, data } = await MenuService.update(
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

router.delete("/:id", async (req, res) => {
  try {
    let { success, message, data } = await MenuService.hardDelete(
      req.params.id
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
    let { success, message, data } = await MenuService.list(
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

    const result = await menuModal.find({
      fieldName: { $regex: ".*" + searchText + ".*", $options: "i" },
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
