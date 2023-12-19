const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const ChatSchema = new Schema(
  {
    message: {
      type: String,
      required: true,
    },
    message_type: {
      type: String,
      enum: ["request","response"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const User = mongoose.model("Chat", ChatSchema);

module.exports = User;
