const RedeemCodeModal = require("./redeemCode.modal");
const pagination = require("../../../helper/pagination");

exports.create = async (userDetails) => {
  try {
    const data = new RedeemCodeModal(userDetails);
    const userData = await data.save();

    if (userData) {
      return {
        success: true,
        message: "Coupon used(coupon_added) by the user successfully",
        data: userData,
      };
    } else {
      return {
        success: false,
        message: "Coupon not used(coupon_not_added) created ",
        data: userData,
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
    const result = await RedeemCodeModal.findByIdAndUpdate(
      params_id,
      user,
      options
    );

    if (result) {
      return {
        success: true,
        message: "User's redeemCode updation successfull ",
        data: result,
      };
    } else {
      return {
        success: false,
        message: "User's redeemCode updation not successfull ",
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
    const respose = await pagination.list(RedeemCodeModal, where, datum, [
      "userId",
      "promocodeId",
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
    };
  }
};
