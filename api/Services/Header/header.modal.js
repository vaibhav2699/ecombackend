const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const HeaderSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    Img: {
      type: String,
      required: true,
      trim: true,
    },
    categoryId: {
      type: mongoose.Types.ObjectId,
      required: false,
      ref: "category",
    },
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

const Header = mongoose.model("header", HeaderSchema);

module.exports = Header;
