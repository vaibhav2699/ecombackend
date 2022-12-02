const { responseMessages } = require("../../../helper/responseMessages");
const pagination = require("../../../helper/pagination");
const Product = require("./product.modal");

exports.Exists = async (where) => {
  try {
    const product = await Product.findOne(where);
    if (product) {
      return {
        success: true,
        message: responseMessages.productFound,
        data: product,
      };
    } else {
      return {
        success: false,
        message: responseMessages.productNotfound,
        data: null,
      };
    }
  } catch (error) {
    return {
      success: false,
      message: responseMessages.productError,
      data: error.message,
    };
  }
};

exports.create = async (body, file) => {
  try {
    const finalBody = { ...body, img: file.path };

    const productInfo = new Product(finalBody);
    const productData = await productInfo.save();

    if (productData) {
      return {
        success: true,
        message: responseMessages.productAdded,
        data: productData,
      };
    } else {
      return {
        success: true,
        message: responseMessages.productNotadded,
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

exports.update = async (params_id, product) => {
  try {
    const options = { new: true };
    const result = await Product.findByIdAndUpdate(params_id, product, options);

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
    let productInfo = { ...body };

    if (typeof body.productImg === "string") {
      productInfo["img"] = body.productImg;
    } else {
      productInfo["img"] = file.path;
    }

    const result = await Product.findByIdAndUpdate(params_id, productInfo);

    if (result) {
      return {
        success: true,
        message: "Product updated successfully",
        data: result,
      };
    } else {
      return {
        success: false,
        message: "Product not  updated ",
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

exports.softDelete = async (params_id) => {
  try {
    const result = await Product.findByIdAndUpdate(params_id, {
      isActive: false,
    });
    if (result) {
      return {
        success: true,
        message: responseMessages.productDeleted,
        data: result,
      };
    } else {
      return {
        success: true,
        message: responseMessages.productnotDeleted,
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
    const respose = await pagination.list(Product, where, datum, [
      "categoryId",
    ]);
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
    };
  }
};

exports.updateMany = async (body) => {
  try {
    const result = await Promise.all(
      body.data.map((x) =>
        Product.findByIdAndUpdate(x.productId, {
          quantity: x.quantity,
        })
      )
    );

    if (result) {
      return {
        success: true,
        message: "PRODUCTS UPDATED",
        data: result,
      };
    } else {
      return {
        success: false,
        message: "PRODUCTS NOT UPDATED",
        data: null,
      };
    }
  } catch (error) {
    return {
      success: false,
      message: "ERROR",
      data: error.message,
    };
  }
};
