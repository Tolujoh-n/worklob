const express = require("express");
const router = express.Router();
const Escrow = require("../models/Escrow");

// Create Offer
router.post("/offer", async (req, res) => {
  const { job_id, client_id, wallet_address } = req.body;

  if (!job_id || !client_id || !wallet_address) {
    return res
      .status(400)
      .json({ message: "job_id, client_id, and wallet_address are required." });
  }

  try {
    const escrow = new Escrow({
      job_id,
      client_id,
      wallet_address,
      status: "Offer",
    });
    await escrow.save();
    res.status(200).json({ message: "Offer created successfully", escrow });
  } catch (err) {
    res.status(500).json({ message: "Error creating offer", error: err });
  }
});

// Update Deposit
router.post("/deposit", async (req, res) => {
  const { job_id, client_id, wallet_address } = req.body;

  try {
    const escrow = await Escrow.findOneAndUpdate(
      { job_id, client_id },
      { status: "Deposit", wallet_address },
      { new: true }
    );
    if (!escrow) return res.status(404).json({ message: "Escrow not found" });
    res.status(200).json({ message: "Funds deposited successfully", escrow });
  } catch (err) {
    res.status(500).json({ message: "Error depositing funds", error: err });
  }
});

// Mark as In-Progress
router.post("/in-progress", async (req, res) => {
  const { job_id, freelancer_id, wallet_address } = req.body;

  try {
    const escrow = await Escrow.findOneAndUpdate(
      { job_id, freelancer_id },
      { status: "In-Progress", wallet_address },
      { new: true }
    );
    if (!escrow) return res.status(404).json({ message: "Escrow not found" });
    res.status(200).json({ message: "Job marked as In-Progress", escrow });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error marking as In-Progress", error: err });
  }
});

// Mark as Completed
router.post("/completed", async (req, res) => {
  const { job_id, freelancer_id, wallet_address } = req.body;

  try {
    const escrow = await Escrow.findOneAndUpdate(
      { job_id, freelancer_id },
      { status: "Completed", wallet_address },
      { new: true }
    );
    if (!escrow) return res.status(404).json({ message: "Escrow not found" });
    res.status(200).json({ message: "Job marked as Completed", escrow });
  } catch (err) {
    res.status(500).json({ message: "Error marking as Completed", error: err });
  }
});

// Confirm Transaction
router.post("/confirm", async (req, res) => {
  const { job_id, client_id, wallet_address } = req.body;

  try {
    const escrow = await Escrow.findOneAndUpdate(
      { job_id, client_id },
      { status: "Confirm", wallet_address },
      { new: true }
    );
    if (!escrow) return res.status(404).json({ message: "Escrow not found" });
    res
      .status(200)
      .json({ message: "Transaction confirmed successfully", escrow });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error confirming transaction", error: err });
  }
});

module.exports = router;
