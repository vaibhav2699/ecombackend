const express = require("express");
const router = express.Router();
const productService = require("../../Services/Product/product.service");
const multer = require("multer");
const productValidator = require("./product.validator");
const ProductModal = require("../../Services/Product/product.modal");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/img/product");
  },
  filename: function (req, file, cb) {
    cb(null, "product-" + Date.now() + "." + file.originalname.split(".")[1]);
  },
});

const uploadImg = multer({ storage: storage }).single("productImg");

router.get("/:id", async (req, res) => {
  try {
    let { success, message, data } = await productService.Exists({
      _id: req.params.id,
    });

    if (success) {
      return res.status(200).json({ success, message, data });
    } else {
      return res.status(400).json({ success, message, data });
    }
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

router.post("/", uploadImg, productValidator.product, async (req, res) => {
  try {
    let { success, message, data } = await productService.create(
      req.body,
      req.file
    );

    if (success) {
      return res.status(200).json({ success, message, data });
    } else {
      return res.status(400).json({ success, message, data });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    let { success, message, data } = await productService.update(
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

router.patch("/:id", uploadImg, async (req, res) => {
  try {
    let { success, message, data } = await productService.Img_update(
      req.params.id,
      req.file,
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
    let { success, message, data } = await productService.softDelete(
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
    let { success, message, data } = await productService.list(
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

    const result = await ProductModal.find({
      name: { $regex: ".*" + searchText + ".*", $options: "i" },
    }).populate("categoryId");

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

router.post("/updateMany", async (req, res) => {
  try {
    let { success, message, data } = await productService.updateMany(req.body);

    if (success) {
      return res.status(200).json({ success, message, data });
    } else {
      return res.status(400).json({ success, message, data });
    }
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

module.exports = router;
