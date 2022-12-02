const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const UserService = require("../../Services/User/user.service");
const userValidator = require("../../Controller/User/user.validator");
const CONFIG = require("../../../config/config");
const getToken = require("../../../helper/authGaurd");
const email = require("../../../helper/email");
const multer = require("multer");
const userModal = require("../../Services/User/user.modal");
const { number } = require("joi");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/img/user");
  },
  filename: function (req, file, cb) {
    cb(null, "user-" + Date.now() + "." + file.originalname.split(".")[1]);
  },
});

const uploadImg = multer({ storage: storage }).single("userImg");

// this "get" call occurs after the user clicks on the link which was sent in the email
router.get("/verify/:id", async (req, res) => {
  try {
    const { success, message, data } = await UserService.Exists(req.params._id);
    if (success) {
      const updateResponse = await UserService.update(req.params.id, {
        isActive: true,
      });
      if (updateResponse.success) {
        res.status(200).json({ ...updateResponse, data: null });
      } else {
        res.status(400).json({
          success: updateResponse.success,
          message: updateResponse.message,
          data: updateResponse.data,
        });
      }
    } else {
      res.status(400).json({ success, message, data });
    }
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

router.post("/verifyAndChangePassword/:id", async (req, res) => {
  try {
    const { confirmPassword } = req.body;
    const { success, message, data } = await UserService.Exists({
      _id: req.params.id,
    });

    if (success) {
      const salt = await bcrypt.genSalt(10);
      const encryptedPassword = await bcrypt.hash(
        String(confirmPassword),
        salt
      );
      const newPassword = encryptedPassword;

      const updateData = await UserService.update(req.params.id, {
        password: newPassword,
      });

      if (updateData.success) {
        const userData = await updateData.data;
        const { successMail, messageMail } =
          await email.sendForPasswordUpdateSuccess(userData);

        if (successMail) {
          res
            .status(200)
            .json({ success: successMail.success, message: messageMail });
        } else {
          res
            .status(400)
            .json({ success: successMail.success, message: messageMail });
        }
      } else {
        return res.status(400).json({
          success: updated.success,
          message: updated.message,
          data: updated.data,
        });
      }
    } else {
      res.status(400).json({ success, message, data });
    }
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

router.post("/forgotPassword", async (req, res) => {
  try {
    // email is sent throught su req.body
    const { success, message, data } = await UserService.Exists(req.body);

    if (success) {
      const userData = await data;
      const { successMail, messageMail } = await email.sendForPasswordUpdate(
        userData
      );
      if (successMail.success) {
        res
          .status(200)
          .json({ success: successMail.success, message: messageMail });
      } else {
        res
          .status(400)
          .json({ success: successMail.success, message: messageMail });
      }
    } else {
      res.status(400).json({ success, message, data });
    }
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

router.post("/changeEmail/:id", async (req, res) => {
  try {
    const { oldEmail, newEmail } = req.body;
    let { success, message, data } = await UserService.Exists({
      _id: req.params.id,
    });

    if (success) {
      const updated = await UserService.update(req.params.id, {
        isActive: false,
        email: newEmail,
      });

      if (updated.success) {
        const userData = await updated.data;
        const { successMail, messageMail } = await email.sendForEmailUpdate(
          userData
        );

        if (successMail.success) {
          res
            .status(200)
            .json({ success: successMail.success, message: messageMail });
        } else {
          res
            .status(400)
            .json({ success: successMail.success, message: messageMail });
        }
      } else {
        return res.status(400).json({
          success: updated.success,
          message: updated.message,
          data: updated.data,
        });
      }
    } else {
      res.status(400).json({ success, message, data });
    }
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

router.post("/signup", uploadImg, userValidator.signup, async (req, res) => {
  try {
    let { success, message, data } = await UserService.create(
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

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    let { success, message, data } = await UserService.Exists({
      email: email.trim(),
    });

    if (success) {
      const isValidPassword = await bcrypt.compare(password, data.password);
      if (!isValidPassword) {
        return res.status(400).json({
          success: false,
          message: "Passsword not matching",
          data: null,
        });
      }

      const token = getToken.createToken(data._id, email);
      const body = {
        id: data._id,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        token: token,
      };
      return res.status(200).json({ success, message, data: body });
    } else {
      return res.status(400).json({ success, message, data });
    }
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    let { success, message, data } = await UserService.Exists({
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

router.put("/:id", async (req, res) => {
  try {
    let { success, message, data } = await UserService.update(
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
    let { success, message, data } = await UserService.Img_update(
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
    let { success, message, data } = await UserService.softDelete(
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
    let { success, message, data } = await UserService.list(
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

    if (typeof searchText === "number") {
      const result = await userModal.find({
        $or: [{ phoneNumber: searchText }],
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
    } else {
      const result = await userModal.find({
        $or: [
          { firstName: { $regex: ".*" + searchText + ".*", $options: "i" } },
          { lastName: { $regex: ".*" + searchText + ".*", $options: "i" } },
          { email: { $regex: ".*" + searchText + ".*", $options: "i" } },
        ],
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
    }
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

module.exports = router;

