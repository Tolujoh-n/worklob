const mongoose = require("mongoose");

const EscrowSchema = new mongoose.Schema({
  job_id: { type: String, required: true },
  client_id: { type: String, required: true },
  freelancer_id: { type: String },
  wallet_address: { type: String, required: true },
  status: {
    type: String,
    enum: [
      "offer_created",
      "funds_deposited",
      "in_progress",
      "completed",
      "confirmed",
    ],
    default: "offer_created",
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Escrow", EscrowSchema);
