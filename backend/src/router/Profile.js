const express = require("express");
const router = express.Router();
const multer = require("multer");
const Profile = require("../models/Profile"); // Correct import
const User = require("../models/User");

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

// Create Profile
router.post("/:username", upload.single("profileImage"), async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ error: "User not found" });

    // Ensure profile doesn't already exist
    const existingProfile = await Profile.findOne({ user: user._id });
    if (existingProfile)
      return res.status(400).json({ error: "Profile already exists" });

    const profileData = { ...req.body, user: user._id };
    if (req.file) {
      profileData.personalInfo.profileImage = req.file.path;
    }
    const profile = new Profile(profileData);
    await profile.save();

    user.profile = profile._id;
    await user.save();

    res.status(201).json(profile);
  } catch (err) {
    console.error("Error creating profile:", err);
    res.status(500).json({ error: err.message });
  }
});

// Update Profile
router.put("/:username", upload.single("profileImage"), async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ error: "User not found" });

    const profileData = { ...req.body, user: user._id };
    if (req.file) {
      profileData.personalInfo.profileImage = req.file.path;
    }

    console.log("Profile data to be updated:", profileData); // Debugging

    const profile = await Profile.findOneAndUpdate(
      { user: user._id },
      profileData,
      { new: true }
    );

    if (!profile) {
      return res.status(404).json({ error: "Profile not found" });
    }

    console.log("Updated profile data:", profile); // Debugging

    res.json(profile);
  } catch (err) {
    console.error("Error updating profile:", err);
    res.status(500).json({ error: err.message });
  }
});

// Get Profile
router.get("/:username", async (req, res) => {
  try {
    const { username } = req.params;
    console.log("Fetching profile for username:", username); // Debugging
    const user = await User.findOne({ username }).populate("profile");
    if (!user) {
      console.error("User not found for username:", username); // Improved logging
      return res.status(404).json({ error: "User not found" });
    }
    if (!user.profile) {
      console.error("Profile not found for user:", username); // Improved logging
      return res.status(404).json({ error: "Profile not found" });
    }

    const profile = await Profile.findById(user.profile).exec();
    console.log("Profile data fetched:", profile); // Debugging
    res.json(profile);
  } catch (err) {
    console.error("Error fetching profile:", err); // Improved logging
    res.status(500).json({ error: err.message });
  }
});

// Delete Profile
router.delete("/:username", async (req, res) => {
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
