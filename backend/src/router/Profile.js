const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Get user profile
router.get("/:username", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user.personalInfo);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Update user profile
router.put("/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ error: "User not found" });

    const updatedData = req.body;
    if (req.file) {
      updatedData["personalInfo.profileImage"] = req.file.path; // If there's a file, set the path
    }

    Object.keys(updatedData).forEach((key) => {
      user.personalInfo[key] = updatedData[key];
    });

    await user.save();

    res.json(user.personalInfo);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Create user profile (initial setup)
router.post("/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ error: "User not found" });

    if (user.personalInfo)
      return res.status(400).json({ error: "Profile already exists" });

    user.personalInfo = req.body;
    await user.save();

    res.status(201).json(user.personalInfo);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Delete user profile
router.delete("/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ error: "User not found" });

    user.personalInfo = null;
    await user.save();

    res.json({ message: "Profile deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
