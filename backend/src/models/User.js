const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String, // Password is optional for wallet-based users
    },
    walletAddress: {
      type: String, // Unique for wallet-based users
      unique: true,
      sparse: true, // Allows `walletAddress` to be optional for password-based users
    },
    role: {
      type: String,
      enum: ["Customer", "Talent"],
      required: true,
    },
    postedFullTimeJobs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FullTimeJob",
      },
    ],
    postedFreelanceJobs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FreelanceJob",
      },
    ],
    profile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile",
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Middleware to hash passwords before saving the user (for password-based signup)
userSchema.pre("save", async function (next) {
  if (this.isModified("password") && this.password) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

// Method to compare passwords during login
userSchema.methods.comparePassword = async function (password) {
  if (!this.password) return false; // No password set for wallet-based users
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
