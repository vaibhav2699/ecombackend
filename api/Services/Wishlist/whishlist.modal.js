const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WhishlistSchema = new Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      required: true,
      trim: true,
      ref: "user",
    },
    wishlist: [
      {
        productId: {
          type: mongoose.Types.ObjectId,
          required: true,
          trim: true,
          ref: "product",
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

const Wishlist = mongoose.model("wishlist", WhishlistSchema);
module.exports = Wishlist;
