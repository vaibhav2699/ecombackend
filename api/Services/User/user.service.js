const User = require("../User/user.modal");
const { responseMessages } = require("../../../helper/responseMessages");
const pagination = require("../../../helper/pagination");
const bcrypt = require("bcryptjs");
const email = require("../../../helper/email");

exports.create = async (file, user) => {
  try {
    const existUser = await User.findOne({ email: user.email.trim() });
    if (existUser != null) {
      return {
        success: false,
        message: responseMessages.alreadyExists,
        data: null,
      };
    }
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(String(user.password), salt);
    // user.password = encryptedPassword;

    const info = new User({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: encryptedPassword,
      phoneNumber: user.phoneNumber,
      userImg: file.path,
    });
    // const info = new User(user);

    const userData = await info.save();
    const { successMail, messageMail } = await email.sendForVeriy(userData);
    if (successMail) {
      return {
        success: true,
        message: "User created successfully",
        data: userData,
      };
    } else {
      await User.findByIdAndDelete(userData.id);
      return {
        success: false,
        message: messageMail,
        data: "",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: "ERROR_ADDING_USER_DETAILS",
      data: error.message,
    };
  }
};

exports.Exists = async (where) => {
  try {
    const user = await User.findOne(where);

    if (user) {
      return { success: true, message: responseMessages.userFound, data: user };
    } else {
      return {
        success: false,
        message: responseMessages.userNotFound,
        data: null,
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error,
      data: null,
    };
  }
};

exports.update = async (params_id, user) => {
  try {
    const options = { new: true };
    const result = await User.findByIdAndUpdate(params_id, user, options);

    if (result) {
      return {
        success: true,
        message: responseMessages.productUpdated,
        data: result,
      };
    } else if (!result) {
      return {
        success: false,
        message: responseMessages.productNotUpdated,
        data: null,
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error,
      data: null,
    };
  }
};

exports.Img_update = async (params_id, file, body) => {
  try {
    let userInfo = { ...body };
    if (typeof body.userImg === "string") {

      userInfo["userImg"] = body.userImg;
    } else {

      userInfo["userImg"] = file.path;
    }
    const result = await User.findByIdAndUpdate(params_id, userInfo);


    if (result) {
      return {
        success: true,
        message: "User updated successfully",
        data: result,
      };
    } else {
      console.error(error);
      return {
        success: false,
        message: "User not  updated ",
        data: null,
      };
    }

    // const options = { new: true };
    // const result = await User.findByIdAndUpdate(params_id, user, options);

    // if (result) {
    //   return {
    //     success: true,
    //     message: responseMessages.userUpdated,
    //     data: result,
    //   };
    // } else {
    //   return {
    //     success: false,
    //     message: responseMessages.userNotFound,
    //     data: null,
    //   };
    // }
  } catch (error) {
    return {
      success: false,
      message: error,
      data: null,
    };
  }
};

exports.softDelete = async (params_id) => {
  try {
    const result = await User.findByIdAndUpdate(params_id, { isActive: false });
    if (result) {
      return {
        success: true,
        message: responseMessages.userDeleted,
        data: result,
      };
    } else {
      return {
        success: false,
        message: responseMessages.userNotFound,
        data: null,
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error,
      data: null,
    };
  }
};

exports.list = async (where, datum) => {
  try {
    const respose = await pagination.list(User, where, datum);
    if (respose) {
      return {
        success: true,
        message: responseMessages.dataFound,
        data: respose,
      };
    } else {
      return {
        success: false,
        message: responseMessages.dataNotFound,
        data: respose,
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error,
      data: null,
    };
  }
};
