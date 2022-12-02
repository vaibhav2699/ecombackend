const express = require("express");
const router = express.Router();
const FrontSearchService = require("../../Services/FrontSearch/frontSearch.services");

router.post("/", async (req, res) => {
  try {
    let { success, message, data } = await FrontSearchService.getData(req.body);
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
