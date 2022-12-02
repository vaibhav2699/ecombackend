const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AdminUserSchema = new Schema(
  {
    userImg: {
      type: String,
      trim: true,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      trim: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
      trim: true,
    },
    role: {
      type: mongoose.Types.ObjectId,
      required: true,
      trim: true,
      ref: "role",
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
const AdminUser = mongoose.model("adminUsers", AdminUserSchema);
module.exports = AdminUser;
