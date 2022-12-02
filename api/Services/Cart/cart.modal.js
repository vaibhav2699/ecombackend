const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = new Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      required: true,
      trim: true,
      ref: "user",
    },
    cartdetail: [
      {
        productId: {
          type: mongoose.Types.ObjectId,
          required: true,
          trim: true,
          ref: "product",
        },
      
        quantity: {
          type: Number,
          required: true,
          default: 1,
        },
      },
    ],
    isActive: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Cart = mongoose.model("cart", CategorySchema);
module.exports = Cart;
