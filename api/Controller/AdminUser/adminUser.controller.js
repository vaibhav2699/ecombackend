const express = require("express");
const router = express.Router();
const AdminUserService = require("../../Services/AdminUser/adminUser.service");
const multer = require("multer");
const getToken = require("../../../helper/authGaurd");
const bcrypt = require("bcryptjs");
const auth = require("../../../middleWare/auth");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/img/adminUser");
  },
  filename: function (req, file, cb) {
    cb(null, "adminUser-" + Date.now() + "." + file.originalname.split(".")[1]);
  },
});

const uploadImg = multer({ storage: storage }).single("userAdminImg");

// router.post("/signup", uploadImg, async (req, res) => {
//   try {
//     let { success, message, data } = await AdminUserService.create(
//       req.file,
//       req.body
//     );

//     if (success) {
//       return res.status(200).json({ success, message, data });
//     } else {
//       return res.status(400).json({ success, message, data });
//     }
//   } catch (error) {
//     res.status(400).json({ message: error });
//   }
// });

router.post("/signup", async (req, res) => {
  try {
    let { success, message, data } = await AdminUserService.create(req.body);

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

    let { success, message, data } = await AdminUserService.Exists({
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
        role: data.role,
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

router.post("/list", async (req, res) => {
  try {
    let { success, message, data } = await AdminUserService.list(
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

router.put("/:id", auth, async (req, res) => {
  try {
    let { success, message, data } = await AdminUserService.update(
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
router.delete("/:id", auth, async (req, res) => {
  try {
    let { success, message, data } = await AdminUserService.hardDelete(
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

router.get("/:id", async (req, res) => {
  try {
    let { success, message, data } = await AdminUserService.Exists({
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
// pwd chnage user knows previous pwd
router.post("/updatepassword/:id", async (req, res) => {
  try {
    let { success, message, data } = await AdminUserService.passwordChange(
      req.body,
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
// while logged in, user dont know pwd and wanted to know so an auto generated pwd is mailed
router.post("/passwordMailed/:id", async (req, res) => {
  try {
    let { success, message, data } = await AdminUserService.passwordConfig(
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

// while user is signed out and wanted to know pwd, a mail is send with a link to updated pwd
router.post("/forgotPassword", async (req, res) => {
  try {
    let { success, message, data } = await AdminUserService.pwdLinkMail(
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
// after follwoing the mail link, this api works
// accept confirm password and updates it
router.post("/confirmPassword/:id", async (req, res) => {
  try {
    let { success, message, data } =
      await AdminUserService.confirmPasswordResponse(req.params.id, req.body);
    if (success) {
      return res.status(200).json({ success, message, data });
    } else {
      return res.status(400).json({ success, message, data });
    }
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

router.post("/check", auth, (req, res) => {
  //   console.log("CEHCK", req.user); // to get the data fom token
  res
    .status(200)
    .json({ success: true, message: "Welcome 🙌", data: req.body });
  // res.status(200).send("Welcome 🙌 , it works");
});

module.exports = router;
