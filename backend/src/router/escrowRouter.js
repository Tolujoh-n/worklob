const express = require("express");
const Escrow = require("../models/Escrow");
const FullTimeJob = require("../models/FullTimeJob");
const router = express.Router();

// Route to initialize escrow
router.post("/initiate", async (req, res) => {
  const { job_id, client_id, freelancer_id, wallet_address } = req.body;
  try {
    // Fetch job details directly from the database
    const jobDetails = await FullTimeJob.findById(job_id);

    if (!jobDetails) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Create escrow record
    const escrow = await Escrow.create({
      job_id,
      client_id,
      freelancer_id,
      wallet_address,
      stage: 0, // Initial stage (no actions)
      status: "initiated",
      amount: jobDetails.budget + jobDetails.fixedCompensation, // Example: summing budget and fixed compensation
    });

    res.status(201).json({ message: "Escrow initiated successfully", escrow });
  } catch (error) {
    console.error("Error initiating escrow:", error);
    res
      .status(500)
      .json({ message: "Failed to initiate escrow", error: error.message });
  }
});

// Route for the client to offer the job (Stage 1)
router.post("/offer", async (req, res) => {
  const { job_id, client_id, wallet_address } = req.body;
  try {
    const escrow = await Escrow.findOne({ where: { job_id } });

    if (!escrow) return res.status(404).json({ error: "Escrow not found" });
    if (escrow.client_id !== client_id)
      return res
        .status(403)
        .json({ error: "Only the client can offer the job" });

    if (escrow.stage !== 0)
      return res
        .status(400)
        .json({ error: "Cannot offer the job at this stage" });

    escrow.stage = 1;
    escrow.status = "offered";
    escrow.wallet_address = wallet_address;
    await escrow.save();

    res.status(200).json({ message: "Job offered successfully", escrow });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error offering job", error: error.message });
  }
});

// Route for the client to deposit (Stage 2)
router.post("/deposit", async (req, res) => {
  const { job_id, client_id, wallet_address } = req.body;
  try {
    const escrow = await Escrow.findOne({ where: { job_id } });

    if (!escrow) return res.status(404).json({ error: "Escrow not found" });
    if (escrow.client_id !== client_id)
      return res.status(403).json({ error: "Only the client can deposit" });

    if (escrow.stage !== 1)
      return res.status(400).json({ error: "Cannot deposit at this stage" });

    escrow.stage = 2;
    escrow.status = "deposited";
    escrow.wallet_address = wallet_address;
    await escrow.save();

    res.status(200).json({ message: "Deposit made successfully", escrow });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error making deposit", error: error.message });
  }
});

// Route for the freelancer to start the job (Stage 3)
router.post("/in-progress", async (req, res) => {
  const { job_id, freelancer_id, wallet_address } = req.body;
  try {
    const escrow = await Escrow.findOne({ where: { job_id } });

    if (!escrow) return res.status(404).json({ error: "Escrow not found" });
    if (escrow.freelancer_id !== freelancer_id)
      return res
        .status(403)
        .json({ error: "Only the freelancer can mark the job as in-progress" });

    if (escrow.stage !== 2)
      return res
        .status(400)
        .json({ error: "Cannot mark job as in-progress at this stage" });

    escrow.stage = 3;
    escrow.status = "in-progress";
    escrow.wallet_address = wallet_address;
    await escrow.save();

    res.status(200).json({ message: "Job marked as in-progress", escrow });
  } catch (error) {
    res.status(500).json({
      message: "Error marking job as in-progress",
      error: error.message,
    });
  }
});

// Route for the freelancer to complete the job (Stage 4)
router.post("/completed", async (req, res) => {
  const { job_id, freelancer_id, wallet_address } = req.body;
  try {
    const escrow = await Escrow.findOne({ where: { job_id } });

    if (!escrow) return res.status(404).json({ error: "Escrow not found" });
    if (escrow.freelancer_id !== freelancer_id)
      return res
        .status(403)
        .json({ error: "Only the freelancer can mark the job as completed" });

    if (escrow.stage !== 3)
      return res
        .status(400)
        .json({ error: "Cannot mark job as completed at this stage" });

    escrow.stage = 4;
    escrow.status = "completed";
    escrow.wallet_address = wallet_address;
    await escrow.save();

    res.status(200).json({ message: "Job marked as completed", escrow });
  } catch (error) {
    res.status(500).json({
      message: "Error marking job as completed",
      error: error.message,
    });
  }
});

// Route for the client to confirm the job (Stage 5)
router.post("/confirm", async (req, res) => {
  const { job_id, client_id, wallet_address } = req.body;
  try {
    const escrow = await Escrow.findOne({ where: { job_id } });

    if (!escrow) return res.status(404).json({ error: "Escrow not found" });
    if (escrow.client_id !== client_id)
      return res
        .status(403)
        .json({ error: "Only the client can confirm the job" });

    if (escrow.stage !== 4)
      return res
        .status(400)
        .json({ error: "Cannot confirm job at this stage" });

    escrow.stage = 5;
    escrow.status = "confirmed";
    escrow.wallet_address = wallet_address;
    await escrow.save();

    res.status(200).json({ message: "Job confirmed successfully", escrow });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error confirming job", error: error.message });
  }
});

module.exports = router;
