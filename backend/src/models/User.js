const mongoose = require("mongoose");

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
      type: String,
      required: function () {
        // Password is required only if the user is not using wallet-based registration
        return !this.walletAddress;
      },
    },
    walletAddress: {
      type: String,
      unique: true,
      sparse: true, // Allows this field to be optional for users without wallets
    },
    role: {
      type: String,
      enum: ["Customer", "Talent"],
      required: true,
    },
    accountType: {
      type: String,
      enum: ["Wallet", "Password"],
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
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Pre-save hook to ensure proper handling of password or wallet registration
userSchema.pre("save", async function (next) {
  if (this.password && this.isModified("password")) {
    const bcrypt = require("bcryptjs");
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
