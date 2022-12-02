const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MenuSchema = new Schema(
  {
    fieldName: {
      type: String,
      required: true,
      trim: true,
    },
    path: {
      type: String,
      required: true,
      trim: true,
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

const Menu = mongoose.model("menu", MenuSchema);
module.exports = Menu;
