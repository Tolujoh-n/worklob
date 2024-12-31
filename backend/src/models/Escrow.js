const mongoose = require("mongoose");

const EscrowSchema = new mongoose.Schema({
  job_id: { type: String, required: true },
  client_id: { type: String, required: true },
  freelancer_id: { type: String },
  wallet_address: { type: String, required: true },
  status: {
    type: String,
    enum: ["Offer", "Deposit", "In-Progress", "Completed", "Confirm"],
    required: true,
  },
});

module.exports = mongoose.model("Escrow", EscrowSchema);
