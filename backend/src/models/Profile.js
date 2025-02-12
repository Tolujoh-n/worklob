const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    personalInfo: {
      name: String,
      website: String,
      country: String,
      bio: String,
      skills: [String],
      profileImage: String,
    },
    workExperience: [
      {
        company: String,
        role: String,
        years: String,
        currentlyWorking: Boolean,
        description: String,
      },
    ],
    education: [
      {
        institution: String,
        graduationYear: String,
        levelOfStudy: String,
        major: String,
      },
    ],
    socialLinks: {
      linkedin: String,
      facebook: String,
      twitter: String,
    },
    freelanceInfo: {
      specialization: String,
      hourlyRate: String,
      preferredPaymentOptions: [String],
      portfolio: [
        {
          projectName: String,
          description: String,
          files: [String],
        },
      ],
    },
    fullTimeInfo: {
      position: String,
      experience: String,
      cvFile: String,
    },
    contactInfo: {
      email: String,
      linkedin: String,
      github: String,
    },
  },
  { timestamps: true }
);

const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;
