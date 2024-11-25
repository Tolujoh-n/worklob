const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const z = require("zod");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET || "tushar";

// Zod schemas
const signupBody = z
  .object({
    username: z.string().min(1, { message: "Username is required" }),
    email: z.string().email({ message: "Invalid email format" }),
    password: z.string().min(6).optional(),
    role: z.enum(["Customer", "Talent"]),
    wallet: z.string().optional(), // Wallet address for wallet-based registration
    confirmPassword: z.string().optional(),
  })
  .refine((data) => !data.password || data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

const signinBody = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  password: z.string().min(6).optional(),
  wallet: z.string().optional(),
});

// Signup endpoint
router.post("/signup", async (req, res) => {
  const parsed = signupBody.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      msg: "Invalid input",
      errors: parsed.error.errors,
    });
  }

  try {
    const { email, username, password, wallet, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { wallet }] });
    if (existingUser) {
      return res.status(409).json({ msg: "Email or Wallet already taken" });
    }

    const hashedPassword = password ? await bcrypt.hash(password, 12) : null;

    // Create new user
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      wallet,
      role,
    });

    const userId = user._id;
    const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: "1h" });

    return res.status(201).json({
      msg: "User account created successfully",
      token,
      user: {
        username: user.username,
        email: user.email,
        id: userId,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Error during signup:", error);
    return res.status(500).json({ msg: "Server error during signup" });
  }
});

// Signin endpoint
router.post("/signin", async (req, res) => {
  const parsed = signinBody.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      msg: "Invalid input",
      errors: parsed.error.errors,
    });
  }

  try {
    const { username, password, wallet } = req.body;

    const user = await User.findOne({ $or: [{ username }, { wallet }] });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    if (password) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: "Invalid username or password" });
      }
    } else if (wallet && wallet !== user.wallet) {
      return res.status(400).json({ msg: "Invalid wallet address" });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.status(200).json({
      msg: "Signin successful",
      token,
      user: { username: user.username, email: user.email, role: user.role },
    });
  } catch (error) {
    console.error("Error during signin:", error);
    return res.status(500).json({ msg: "Server error during signin" });
  }
});

// Additional endpoints (unchanged)
router.post("/userid", async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ user });
  } catch (e) {
    return res.status(500).json({ msg: "Error retrieving user" });
  }
});

router.post("/logout", (req, res) => {
  return res.status(200).json({
    msg: "Logout successful",
  });
});

router.post("/change-role", async (req, res) => {
  const { userId, role } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.role = role;
    await user.save();

    res.status(200).json({ message: "Role updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/change-password/:userId", async (req, res) => {
  // eslint-disable-next-line no-undef
  const parsed = changePasswordBody.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      msg: "Invalid input",
      errors: parsed.error.errors,
    });
  }

  try {
    const { userId } = req.params;
    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Incorrect old password" });
    }

    user.password = await bcrypt.hash(newPassword, 12);
    await user.save();

    return res.status(200).json({ msg: "Password updated successfully" });
  } catch (error) {
    console.error("Error during password change:", error.message);
    return res.status(500).json({ msg: "Server error during password change" });
  }
});

router.get("/userDetails", async (req, res) => {
  const { senderId, receiverId } = req.query;
  try {
    const [sender, receiver] = await Promise.all([
      User.findById(senderId).select("-password"),
      User.findById(receiverId).select("-password"),
    ]);

    if (!sender || !receiver) {
      return res.status(404).json({ message: "Sender or Receiver not found" });
    }

    res.status(200).json({ sender, receiver });
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
