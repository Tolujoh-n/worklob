const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const User = require("../models/User");

// Set up multer for handling file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, "uploads");
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Route to get user profile data
router.get("/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user.personalInfo);
  } catch (error) {
    console.error("Error fetching profile data:", error);
    res.status(500).json({ error: "Failed to fetch profile data" });
  }
});

// Route to update user profile data
router.put("/:username", upload.single("profileImage"), async (req, res) => {
  try {
    const { username } = req.params;
    const { name, website, country, bio, skills } = req.body;
    const profileImage = req.file ? req.file.path : null;

    const updatedProfile = {
      name,
      website,
      country,
      bio,
      skills: skills ? skills.split(",").map((skill) => skill.trim()) : [],
    };

    if (profileImage) {
      updatedProfile.profileImage = profileImage;
    }

    const user = await User.findOneAndUpdate(
      { username },
      { personalInfo: updatedProfile },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user.personalInfo);
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ error: "Failed to update profile" });
  }
});

module.exports = router;
