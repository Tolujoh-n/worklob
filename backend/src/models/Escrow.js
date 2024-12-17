const mongoose = require("mongoose");

const escrowSchema = new mongoose.Schema(
  {
    job_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
    client_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    freelancer_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    wallet_address: { type: String, required: true },
    stage: { type: Number, default: 0 }, // 0: Initiated, 1: Offered, 2: Deposited, 3: In-progress, 4: Completed, 5: Confirmed
    status: { type: String, required: true }, // Initiated, Offered, Deposited, In-progress, Completed, Confirmed
    amount: { type: Number, required: true }, // Budget + fixed compensation
  },
  { timestamps: true }
);

module.exports = mongoose.model("Escrow", escrowSchema);
