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

// Route to get work experience data
router.get("/:username/workexperience", async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user.workExperience);
  } catch (error) {
    console.error("Error fetching work experience data:", error);
    res.status(500).json({ error: "Failed to fetch work experience data" });
  }
});

// Route to update work experience data
router.put("/:username/workexperience", async (req, res) => {
  try {
    const { username } = req.params;
    const { workExperience } = req.body;

    const user = await User.findOneAndUpdate(
      { username },
      { workExperience },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user.workExperience);
  } catch (error) {
    console.error("Error updating work experience:", error);
    res.status(500).json({ error: "Failed to update work experience" });
  }
});

// Route to get education data
router.get("/:username/education", async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user.education);
  } catch (error) {
    console.error("Error fetching education data:", error);
    res.status(500).json({ error: "Failed to fetch education data" });
  }
});

// Route to get education data
router.put("/:username/education", async (req, res) => {
  try {
    const { username } = req.params;
    const { education } = req.body;

    console.log(`Updating education for ${username}`);
    console.log(education);

    const user = await User.findOneAndUpdate(
      { username },
      { education },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user.education);
  } catch (error) {
    console.error("Error updating education:", error);
    res.status(500).json({ error: "Failed to update education" });
  }
});

// Route to get sociallink data
router.get("/:username/sociallinks", async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user.socialLinks);
  } catch (error) {
    console.error("Error fetching social links data:", error);
    res.status(500).json({ error: "Failed to fetch social links data" });
  }
});

// Route to get social data
router.put("/:username/sociallinks", async (req, res) => {
  try {
    const { username } = req.params;
    const { linkedin, facebook, twitter } = req.body;

    console.log(`Updating social links for ${username}`);
    console.log(req.body);

    const user = await User.findOneAndUpdate(
      { username },
      { socialLinks: { linkedin, facebook, twitter } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user.socialLinks);
  } catch (error) {
    console.error("Error updating social links:", error);
    res.status(500).json({ error: "Failed to update social links" });
  }
});

module.exports = router;
