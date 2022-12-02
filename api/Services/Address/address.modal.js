const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AddressSchema = new Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      required: true,
      trim: true,
      ref: "user",
    },
    label: {
      type: String,
      required: true,
    },
    address_1: {
      type: String,
      required: true,
    },
    address_2: {
      type: String,
    },

    landmark: {
      type: String,
    },
    pincode: {
      type: Number,
      trim: true,
      required: true,
    },
    type: {
      type: String,
      required: true,
      trim: true,
      enum: ["HOME", "WORK", "OTHER"],
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

const Address = mongoose.model("address", AddressSchema);
module.exports = Address;
