const ProductModal = require("../Product/product.modal");
const CategoryModal = require("../Category/category.modal");

exports.getData = async (body) => {
  try {
    let searchText = body.searchText;
    const [products, category] = await Promise.all([
      ProductModal.find({
        $or: [{ name: { $regex: ".*" + searchText + ".*", $options: "i" } }],
      }).populate("categoryId"),
      CategoryModal.find({
        $or: [
          { categoryName: { $regex: ".*" + searchText + ".*", $options: "i" } },
        ],
      }),
    ]);

    let Data = [];

    Data.push({
      products,
      category,
    });

    if (category || products) {
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
