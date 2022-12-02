const express = require("express");
const router = express.Router();
const RightsService = require("../../Services/Rights/rights.service");
const RoleService = require("../../Services/role/role.service");

router.post("/", async (req, res) => {
  try {
    let { success } = await RoleService.update(req.body.roleId, {
      taken: req.body.taken,
    });
    if (success) {
      const info = {
        roleId: req.body.roleId,
        rights: req.body.rights,
      };
      let { success, message, data } = await RightsService.create(info);
      if (success) {
        return res.status(200).json({ success, message, data });
      } else {
        Updation = await RoleService.update(req.body.roleId, { taken: false });
        return res
          .status(400)
          .json({ success: false, message: "data not added", data: null });
      }
    } else {
      return res
        .status(400)
        .json({ success: false, message: "data not added", data: null });
    }
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

router.put("/:id", async (req, res) => {
  try {
    let { success, message, data } = await RightsService.update(
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
    let { success, message, data } = await RightsService.hardDelete(
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
    let { success, message, data } = await RightsService.list(
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

module.exports = router;
