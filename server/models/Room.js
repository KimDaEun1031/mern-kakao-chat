const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    roomPhoto: {
      type: String,
      default: "https://ifh.cc/g/MCL1jY.jpg"
    },
    members: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }],
    messages: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    }],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("Room", roomSchema);
