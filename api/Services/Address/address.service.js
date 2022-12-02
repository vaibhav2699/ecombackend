const AddressModal = require("./address.modal");
const pagination = require("../../../helper/pagination");

exports.create = async (userAddress) => {
  try {
    const userInfo = AddressModal({
      userId: userAddress.userId.trim(),
      label: userAddress.label,
      address_1: userAddress.address_1,
      address_2: userAddress.address_2,
      landmark: userAddress.landmark,
      pincode: userAddress.pincode,
      type: userAddress.type,
    });

    const userData = await userInfo.save();

    if (userData) {
      return {
        success: true,
        message: "User's address added successfully",
        data: userData,
      };
    } else {
      return {
        success: false,
        message: "User's address not added",
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
    const result = await AddressModal.findByIdAndUpdate(
      params_id,
      user,
      options
    );

    if (result) {
      return {
        success: true,
        message: "Address updated successfully",
        data: result,
      };
    } else {
      return {
        success: false,
        message: "Address  not updated ",
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

exports.softDelete = async (params_id) => {
  try {
    const result = await AddressModal.findByIdAndUpdate(params_id, {
      isActive: false,
    });
    if (result) {
      return {
        success: true,
        message: "Address deleted succesfully",
        data: result,
      };
    } else {
      return {
        success: true,
        message: "Address not deleted ",
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
    const respose = await pagination.list(AddressModal, where, datum, [
      "userId",
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
