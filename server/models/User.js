const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: "name",
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      default: "https://ifh.cc/g/MCL1jY.jpg"
    },
    friendList: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: [],
    }],
    chatList: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      default: [],
    }]
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("User", userSchema);
