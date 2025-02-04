const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  jobId: { type: mongoose.Schema.Types.ObjectId, required: true },
  jobType: {
    type: String,
    enum: ["FullTimeJob", "FreelanceJob", "GigJob"],
    required: true,
  },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  talentId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  message: { type: String, required: true },
  type: { type: String, enum: ["text", "image", "file"], default: "text" }, // Add this field for media type
  isRead: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  walletAddress: { type: String, required: false },
  status: {
    type: String,
    enum: [
      "applied",
      "offered",
      "deposited",
      "inProgress",
      "completed",
      "confirmed",
    ],
    default: "applied",
  },
});

const Chat = mongoose.model("Chat", chatSchema);
module.exports = Chat;
