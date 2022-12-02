const adminUserModl = require("./adminUser.modal");
const pagination = require("../../../helper/pagination");
const bcrypt = require("bcryptjs");
const email = require("../../../helper/email");
const generator = require("generate-password");

// exports.create = async (file, user) => {
//   try {
//     const existUser = await adminUserModl.findOne({ email: user.email.trim() });
//     if (existUser != null) {
//       return {
//         success: false,
//         message: "AdminUser already exists",
//         data: null,
//       };
//     }
//     const salt = await bcrypt.genSalt(10);
//     const encryptedPassword = await bcrypt.hash(String(user.password), salt);

//     const info = new adminUserModl({
//       firstName: user.firstName,
//       lastName: user.lastName,
//       email: user.email,
//       password: encryptedPassword,
//       phoneNumber: user.phoneNumber,
//       userImg: file.path,
//       role: user.role,
//     });

//     const { successMail, messageMail } = await email.sendForAdminRegister(user);
//     if (successMail) {
//       const userData = await info.save();
//       if (userData) {
//         return {
//           success: true,
//           message: "User created successfully",
//           data: userData,
//         };
//       } else {
//         return {
//           success: true,
//           message: "User not created ",
//           data: userData,
//         };
//       }
//     } else {
//       return {
//         success: false,
//         message: "User not created , plz try again later",
//         data: null,
//       };
//     }
//   } catch (error) {
//     console.error(error);
//     return {
//       success: false,
//       message: "ERROR_ADDING_USER_DETAILS",
//       data: error.message,
//     };
//   }
// };

exports.create = async (userData) => {
  try {
    const existUser = await adminUserModl.findOne({
      email: userData.email.trim(),
    });
    if (existUser !== null) {
      return {
        success: false,
        message: "User already exsists",
        data: null,
      };
    }
    var GeneratedPassword = generator.generate({
      length: 10,
      numbers: true,
    });
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(
      String(GeneratedPassword),
      salt
    );

    const info = new adminUserModl({
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      phoneNumber: userData.phoneNumber,
      role: userData.role,
      password: encryptedPassword,
    });
    const userInfo = await info.save();

    if (userInfo) {
      const { successMail, messageMail } = await email.sendForAdminRegister(
        userInfo,
        GeneratedPassword
      );
      if (successMail) {
        return {
          success: successMail,
          message: messageMail,
          data: userInfo,
        };
      } else {
        const deletion = await adminUserModl.findByIdAndDelete(userInfo._id);

        if (deletion) {
          return {
            success: false,
            message:
              "User created but then deleted beacuse of email api issues",
            data: null,
          };
        } else {
          return {
            success: false,
            message: "Error plz show this to software developer",
            data: null,
          };
        }
      }
    } else {
      return {
        success: false,
        message: "User not created",
        data: null,
      };
    }
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "ERROR_ADDING_USER_DETAILS",
      data: error.message,
    };
  }
};

exports.Exists = async (where) => {
  try {
    const user = await adminUserModl.findOne(where).populate("role");

    if (user) {
      return { success: true, message: "USER FOUND SUCCESSFULLY", data: user };
    } else {
      return {
        success: false,
        message: "USER NOT FOUND",
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
    const result = await adminUserModl.findByIdAndUpdate(params_id, user);

    if (result) {
      return {
        success: true,
        message: "DATA UPDATION SUCCESSFULL",
        data: result,
      };
    } else if (!result) {
      return {
        success: false,
        message: "DATA NOT UPDATED",
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
    const respose = await pagination.list(adminUserModl, where, datum, [
      "role",
    ]);
    if (respose) {
      return {
        success: true,
        message: "DATA FOUND SUCCESSFULLY",
        data: respose,
      };
    } else {
      return {
        success: false,
        message: "DATA NOT FOUND",
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

exports.hardDelete = async (params_id) => {
  try {
    const result = await adminUserModl.findByIdAndDelete(params_id);

    if (result) {
      return {
        success: true,
        message: "Data deletion successfulyy",
        data: result,
      };
    } else {
      return {
        success: false,
        message: "Data not deleted ",
        data: null,
      };
    }
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: error,
      data: null,
    };
  }
};

exports.passwordChange = async (body, id) => {
  try {
    const user = await adminUserModl.findOne({ _id: id });

    if (user) {
      const isValidPassword = await bcrypt.compare(
        body.oldPassword,
        user.password
      );

      if (isValidPassword) {
        const salt = await bcrypt.genSalt(10);
        const encryptedPassword = await bcrypt.hash(
          String(body.newPassword),
          salt
        );
        const newPassword = encryptedPassword;

        const updateData = await adminUserModl.findByIdAndUpdate(id, {
          password: newPassword,
        });

        if (updateData) {
          const { successMail, messageMail } =
            await email.sendPwdUpdationSuccessfull(user, body.newPassword);

          if (successMail) {
            return {
              success: true,
              message: "Password updation successfull and email sended",
              data: user,
            };
          } else {
            return {
              success: false,
              message: "Password updation suceessfull but email not sended",
              data: null,
            };
          }
        } else {
          return {
            success: false,
            message: "Password updation unsuccessfull",
            data: null,
          };
        }
      } else {
        return {
          success: false,
          message: "Password not mactching",
          data: null,
        };
      }
    } else {
      return {
        success: false,
        message: "User not found",
        data: null,
      };
    }
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: error,
      data: null,
    };
  }
};

exports.passwordConfig = async (id) => {
  try {
    const user = await adminUserModl.findOne({ _id: id });
    if (user) {
      var GeneratedPassword = generator.generate({
        length: 10,
        numbers: true,
      });
      const salt = await bcrypt.genSalt(10);
      const encryptedPassword = await bcrypt.hash(
        String(GeneratedPassword),
        salt
      );

      const updateData = await adminUserModl.findByIdAndUpdate(id, {
        password: encryptedPassword,
      });

      if (updateData) {
        const { successMail, messageMail } = await email.sendPwdByMail(
          user,
          GeneratedPassword
        );

        if (successMail) {
          return {
            success: true,
            message: "Password updated and mailed successfully",
            data: user,
          };
        } else {
          return {
            success: false,
            message: "Password updated but mail not sended",
            data: null,
          };
        }
      } else {
        return {
          success: false,
          message: "Password not updated",
          data: null,
        };
      }
    } else {
      return {
        success: false,
        message: "User not found",
        data: null,
      };
    }
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: error,
      data: null,
    };
  }
};

exports.pwdLinkMail = async (body) => {
  try {
    const user = await adminUserModl.findOne({ email: body.email }).populate("role");

    if (user) {
      const { successMail, messageMail } = await email.adminUser_Pwd_Mail_Link(
        user
      );

      if (successMail) {
        return {
          success: true,
          message: "Mail sended successfully",
          data: user,
        };
      } else {
        return {
          success: false,
          message: "Mail not sended",
          data: null,
        };
      }
    } else {
      return {
        success: false,
        message: "User NOT found",
        data: null,
      };
    }
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: error,
      data: null,
    };
  }
};

exports.confirmPasswordResponse = async (id, body) => {
  try {
    const user = await adminUserModl.findOne({ _id: id });

    if (user) {
      const salt = await bcrypt.genSalt(10);
      const encryptedPassword = await bcrypt.hash(
        String(body.newPassword),
        salt
      );
      const confirmPassword = encryptedPassword;

      const updateData = await adminUserModl.findByIdAndUpdate(id, {
        password: confirmPassword,
      });

      if (updateData) {
        const { successMail } = await email.sendPwdByMail(
          user,
          body.newPassword
        );

        if (successMail) {
          return {
            success: true,
            message: "pwd updation successfull and mail sended",
            data: user,
          };
        } else {
          return {
            success: false,
            message: "pwd updation succesfull but mail faileddd",
            data: null,
          };
        }
      } else {
        return {
          success: false,
          message: "user pwd updation failed",
          data: null,
        };
      }
    } else {
      return {
        success: false,
        message: "user not found",
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
