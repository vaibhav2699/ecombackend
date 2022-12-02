const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PromocodeSchema = new Schema(
  {
    couponcode: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      required: true,
      trim: true,
      enum: ["FLAT", "PERCENTAGE"],
    },
    minvalue: {
      type: Number,
      required: true,
      trim: true,
    },
    maxdiscountvalue: {
      type: Number,
      trim: true,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Promocode = mongoose.model("promocode", PromocodeSchema);
module.exports = Promocode;
