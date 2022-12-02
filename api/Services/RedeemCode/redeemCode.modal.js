const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RedeemCodeSchema = new Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      required: true,
      trim: true,
      ref: "user",
    },
    promocodeId: {
      type: mongoose.Types.ObjectId,
      required: true,
      trim: true,
      ref: "promocode",
    },
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

const RedeemCode = mongoose.model("redeemcode", RedeemCodeSchema);
module.exports = RedeemCode;
