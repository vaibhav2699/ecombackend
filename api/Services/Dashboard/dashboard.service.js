const OrderModal = require("../../Services/Order/order.modal");
const ProductModal = require("../Product/product.modal");
const UserModal = require("../User/user.modal");
const CategoryModal = require("../Category/category.modal");

exports.getData = async (body) => {
  try {
    const [products, order, user, category, orderData] = await Promise.all([
      ProductModal.find(),
      OrderModal.find(),
      UserModal.find(),
      CategoryModal.find(),
      OrderModal.find({
        createdAt: {
          $gte: new Date(body.startDate),
          $lte: new Date(body.endDate),
        },
      }),
    ]);

    const cartDetail = [].concat.apply(
      [],
      order.map((res) =>
        res.cartdetail.map((res1) => ({
          productId: res1.productId,
          quantity: res1.quantity,
        }))
      )
    );
    const calc = Object.entries(
      cartDetail.reduce((acc, { productId, quantity }) => {
        acc[productId] = (acc[productId] || 0) + quantity;
        return acc;
      }, {})
    ).map(([k, v]) => ({ productId: k, quantity: v }));

    let orderedProducts = [];
    products.forEach((res, index) => {
      const ind = calc.findIndex(
        (res1) => res1.productId === res._id.toString()
      );
      if (ind !== -1) {
        orderedProducts.push({ name: res.name, quantity: calc[ind].quantity });
      } else {
        orderedProducts.push({ name: res.name, quantity: 0 });
      }
    });
    let Data = [];
    Data.push({
      orderedProducts,
      totalOrder: order.length,
      totalProducts: products.length,
      totalUser: user.length,
      totalCategory: category.length,
      orderData,
    });

    if (category) {
      return {
        success: true,
        message: "data found successfully",
        data: Data,
      };
    } else {
      return {
        success: false,
        message: "data not found",
        data: respose,
      };
    }
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: error,
    };
  }
};
