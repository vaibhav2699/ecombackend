const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RightsSchema = new Schema(
  {
    roleId: {
      type: mongoose.Types.ObjectId,
      required: true,
      trim: true,
      ref: "role",
    },
    rights: [
      {
        name: {
          type: String,
          required: true,
        },
        view: {
          type: Boolean,
          required: true,
          default: true,
        },
        edit: {
          type: Boolean,
          required: true,
          default: true,
        },
        deleted: {
          type: Boolean,
          required: true,
          default: true,
        },
        add: {
          type: Boolean,
          required: true,
          default: true,
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

const Rights = mongoose.model("right", RightsSchema);
module.exports = Rights;

// const RightsSchema = new Schema(
//   {
//     roleId: {
//       type: mongoose.Types.ObjectId,
//       required: true,
//       trim: true,
//       ref: "role",
//     },
//     rights: {
//       type: Object,
//       required: true,
//     },
//     isActive: {
//       type: Boolean,
//       default: false,
//       required: true,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );
