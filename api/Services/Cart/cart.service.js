const CartModal = require("./cart.modal");
const pagination = require("../../../helper/pagination");

exports.create = async (userProducts) => {
  try {
    const existUser = await CartModal.findOne({
      userId: userProducts.userId.trim(),
    });
    if (existUser != null) {
      if (
        existUser.cartdetail
          .map((obj) => obj.productId.toString())
          .includes(userProducts.productId)
      ) {
        const index = existUser.cartdetail.findIndex(
          (res) => res.productId.toString() === userProducts.productId
        );
        if (index !== -1) {
          existUser.cartdetail[index].quantity = userProducts.quantity;
        }

        const result = await CartModal.findByIdAndUpdate(
          existUser._id,
          existUser
        );
        if (result) {
          return {
            success: true,
            message: "Product Updated Successfully",
            data: result,
          };
        } else {
          return {
            success: false,
            message: "Product Not  Updated",
            data: null,
          };
        }
      } else {
        existUser.cartdetail.push({
          productId: userProducts.productId.trim(),

          quantity: userProducts.quantity,
        });
        await CartModal.findByIdAndUpdate(existUser._id, existUser);
        return {
          success: true,
          message: "Products Pushed successfully",
          data: existUser,
        };
      }
    } else {
      const cartInfo = CartModal({
        userId: userProducts.userId.trim(),
        cartdetail: [
          {
            productId: userProducts.productId.trim(),

            quantity: userProducts.quantity,
          },
        ],
      });
      const userData = await cartInfo.save();
      return {
        success: true,
        message: "Products  added successfully",
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

exports.hardDelete = async (body) => {
  try {
    const existUser = await CartModal.findOne({
      userId: body.userId,
    });

    if (existUser != null) {
      const updatedCartDetail = existUser.cartdetail.filter(
        (p) => p.productId.toString() !== body.productId
      );
      existUser.cartdetail = updatedCartDetail;
      const result = await CartModal.findByIdAndUpdate(
        existUser._id,
        existUser
      );

      if (result) {
        return {
          success: true,
          message: "PRODUCT DELETED SUCCESSFULYY",
          data: result,
        };
      } else {
        return {
          success: false,
          message: "PRODUCT NOT DELETED",
          data: null,
        };
      }
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

exports.delSelected = async (body) => {
  try {
    const existUser = await CartModal.findOne({
      userId: body.userId,
    });

    if (existUser != null) {
      const updatedCartDetail = existUser.cartdetail.filter(
        (p) => !body.cartdetail.includes(p.productId.toString())
      );

      existUser.cartdetail = updatedCartDetail;
      const result = await CartModal.findByIdAndUpdate(
        existUser._id,
        existUser
      );
      if (result) {
        return {
          success: true,
          message: "PRODUCTS DELETED SUCCESSFULYY",
          data: result,
        };
      } else {
        return {
          success: false,
          message: "PRODUCTS NOT DELETED",
          data: null,
        };
      }
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

exports.clearAll = async (params_id) => {
  try {
    const existUser = await CartModal.findOne({
      userId: params_id,
    });
    if (existUser != null) {
      existUser.cartdetail = [];
      const result = await CartModal.findByIdAndUpdate(
        existUser._id,
        existUser
      );

      if (result) {
        return {
          success: true,
          message: "CART EMPTY SUCCESSFULLY",
          data: result,
        };
      } else {
        return {
          success: false,
          message: "CART NOT EMPTY",
          data: null,
        };
      }
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

exports.Exists = async (where) => {
  try {
    const userProducts = await CartModal.findOne(where);
    if (userProducts) {
      return {
        success: true,
        message: "DATA FOUND SUCCESSFULLY",
        data: userProducts,
      };
    } else {
      return {
        success: false,
        message: "DATA NOT FOUND ",
        data: null,
      };
    }
  } catch (error) {
    return {
      success: false,
      message: "ERROR_FINDING_DATA",
      data: null,
    };
  }
};

exports.list = async (where, datum) => {
  try {
    const respose = await pagination.list(CartModal, where, datum, [
      "cartdetail.productId",
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

// this function is only for deletion happend by API call for orders
exports.delOrderCart = async (body) => {
  try {
    const existUser = await CartModal.findOne({
      userId: body.userId,
    });

    if (existUser != null) {
      const updatedCartDetail = existUser.cartdetail.filter(
        (p) =>
          !body.cartdetail
            .map((p) => p.productId)
            .includes(p.productId.toString())
      );

      existUser.cartdetail = updatedCartDetail;
      const result = await CartModal.findByIdAndUpdate(
        existUser._id,
        existUser
      );
      if (result) {
        return {
          success: true,
          message: "PRODUCTS DELETED SUCCESSFULYY",
          data: result,
        };
      } else {
        return {
          success: false,
          message: "PRODUCTS NOT DELETED",
          data: null,
        };
      }
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
