const mongoose = require("mongoose");

const userSubSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    userName: {
      type: String,
      required: true,
    }
  }
);

const messageSchema = new mongoose.Schema(
  {
    roomID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
    },
    user: [userSubSchema],
    message: {
      type: String,
      required: true,
    },
    checkMessage: {
      type: Boolean,
      required: true,
      default: false,
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("Message", messageSchema);
