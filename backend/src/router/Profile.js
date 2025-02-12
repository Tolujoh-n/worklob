const express = require("express");
const router = express.Router();
const Profile = require("../models/Profile");
const User = require("../models/User");

// Create Profile
router.post("/profile/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ error: "User not found" });

    // Ensure profile doesn't already exist
    const existingProfile = await Profile.findOne({ user: user._id });
    if (existingProfile)
      return res.status(400).json({ error: "Profile already exists" });

    const profileData = { ...req.body, user: user._id };
    const profile = new Profile(profileData);
    await profile.save();

    user.profile = profile._id;
    await user.save();

    res.status(201).json(profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update Profile
router.put("/profile/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ error: "User not found" });

    const profileData = { ...req.body, user: user._id };
    const profile = await Profile.findOneAndUpdate(
      { user: user._id },
      profileData,
      { new: true }
    );

    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get Profile
router.get("/profile/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username }).populate("profile");
    if (!user || !user.profile)
      return res.status(404).json({ error: "Profile not found" });

    res.json(user.profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete Profile
router.delete("/profile/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username });
    if (!user || !user.profile)
      return res.status(404).json({ error: "Profile not found" });

    await Profile.findByIdAndDelete(user.profile);
    user.profile = null;
    await user.save();

    res.json({ message: "Profile deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
