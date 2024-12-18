const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Assuming you have an Escrow model schema
const Escrow = require("../models/Escrow");

// 1. Create Offer
router.post("/offer", async (req, res) => {
  const { job_id, client_id, freelancer_id, wallet_address } = req.body;

  // Validate required fields
  if (!job_id || !client_id || !wallet_address) {
    return res
      .status(400)
      .json({ message: "job_id, client_id, and wallet_address are required." });
  }

  try {
    const escrow = new Escrow({
      job_id,
      client_id,
      freelancer_id, // Optional
      wallet_address,
      status: "offer_created",
    });
    await escrow.save();
    res.status(200).json({ message: "Offer created successfully", escrow });
  } catch (err) {
    console.error("Error creating offer:", err);
    res.status(500).json({ message: "Failed to create offer", error: err });
  }
});

// 2. Deposit Funds
router.post("/deposit", async (req, res) => {
  const { job_id, client_id, wallet_address } = req.body;
  try {
    const escrow = await Escrow.findOneAndUpdate(
      { job_id, client_id },
      { status: "funds_deposited", wallet_address },
      { new: true }
    );
    if (!escrow) return res.status(404).json({ message: "Escrow not found" });
    res.status(200).json({ message: "Funds deposited successfully", escrow });
  } catch (err) {
    res.status(500).json({ message: "Failed to deposit funds", error: err });
  }
});

// 3. Mark In-Progress
router.post("/in-progress", async (req, res) => {
  const { job_id, freelancer_id, wallet_address } = req.body;
  try {
    const escrow = await Escrow.findOneAndUpdate(
      { job_id, status: "funds_deposited" },
      { status: "in_progress", freelancer_id, wallet_address },
      { new: true }
    );
    if (!escrow) return res.status(404).json({ message: "Escrow not found" });
    res.status(200).json({ message: "Job in progress", escrow });
  } catch (err) {
    res.status(500).json({ message: "Failed to update status", error: err });
  }
});

// 4. Mark Completed
router.post("/completed", async (req, res) => {
  const { job_id, freelancer_id, wallet_address } = req.body;
  try {
    const escrow = await Escrow.findOneAndUpdate(
      { job_id, freelancer_id },
      { status: "completed", wallet_address },
      { new: true }
    );
    if (!escrow) return res.status(404).json({ message: "Escrow not found" });
    res.status(200).json({ message: "Job marked as completed", escrow });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to mark job completed", error: err });
  }
});

// 5. Confirm Completion
router.post("/confirm", async (req, res) => {
  const { job_id, client_id, wallet_address } = req.body;
  try {
    const escrow = await Escrow.findOneAndUpdate(
      { job_id, client_id, status: "completed" },
      { status: "confirmed", wallet_address },
      { new: true }
    );
    if (!escrow) return res.status(404).json({ message: "Escrow not found" });
    res.status(200).json({ message: "Job confirmed", escrow });
  } catch (err) {
    res.status(500).json({ message: "Failed to confirm job", error: err });
  }
});

module.exports = router;
