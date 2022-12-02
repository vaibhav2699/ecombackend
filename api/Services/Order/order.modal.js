const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      required: true,
      trim: true,
      ref: "user",
    },
    addressId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "address",
    },
    promocodeId: {
      type: mongoose.Types.ObjectId,
      required: true,
      trim: true,
      ref: "promocode",
    },
    orderStatus: {
      type: String,
      required: true,
      trim: true,
      enum: ["PLACED", "DISPATCHED", "RECEIVED","CANCEL"],
    },
    paymentId: {
      type: String,
      required: true,
      trim: true,
    },

    discountPrice: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
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
      default: true,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("order", OrderSchema);
module.exports = Order;
