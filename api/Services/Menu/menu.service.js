const MenuModal = require("./menu.modal");
const pagination = require("../../../helper/pagination");

exports.create = async (menuDetails) => {
  try {
    const data = new MenuModal(menuDetails);
    const menuData = await data.save();

    if (menuData) {
      return {
        success: true,
        message: "Data added successfulyy",
        data: menuData,
      };
    } else {
      return {
        success: false,
        message: "Data not added ",
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

exports.update = async (params_id, user) => {
  try {
    const result = await MenuModal.findByIdAndUpdate(params_id, user);

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

exports.hardDelete = async (params_id) => {
  try {
    const result = await MenuModal.findByIdAndDelete(params_id);

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

exports.list = async (where, datum) => {
  try {
    const respose = await pagination.list(MenuModal, where, datum);
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
