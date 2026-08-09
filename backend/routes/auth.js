const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { UserModel } = require("../model/UserModel");
const { FundsModel } = require("../model/FundsModel");
const { requireAuth } = require("../middleware/auth");
const { connectDB } = require("../utils/db");

const router = express.Router();

const MOBILE_REGEX = /^[6-9]\d{9}$/;

function signToken(userId) {
  return jwt.sign({ sub: userId.toString() }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
}

function toSafeUser(user) {
  return { id: user._id, name: user.name, mobile: user.mobile };
}

async function connectOrFail(res) {
  try {
    await connectDB();
    return true;
  } catch (err) {
    res.status(503).json({ message: "Database unavailable. Please try again shortly." });
    return false;
  }
}

router.post("/signup", async (req, res, next) => {
  try {
    const name = (req.body.name || "").trim();
    const mobile = (req.body.mobile || "").trim();
    const password = req.body.password || "";

    if (!name) {
      return res.status(400).json({ message: "Please enter your name." });
    }
    if (!MOBILE_REGEX.test(mobile)) {
      return res.status(400).json({ message: "Please enter a valid 10 digit mobile number." });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters." });
    }

    if (!(await connectOrFail(res))) return;

    const existing = await UserModel.findOne({ mobile });
    if (existing) {
      return res.status(409).json({ message: "An account with this mobile number already exists." });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await new UserModel({ name, mobile, password: hashed }).save();
    await new FundsModel({ userId: user._id }).save();

    const token = signToken(user._id);
    return res.status(201).json({ token, user: toSafeUser(user) });
  } catch (err) {
    next(err);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const mobile = (req.body.mobile || "").trim();
    const password = req.body.password || "";

    const genericError = () =>
      res.status(401).json({ message: "Invalid mobile number or password." });

    if (!mobile || !password) {
      return genericError();
    }

    if (!(await connectOrFail(res))) return;

    const user = await UserModel.findOne({ mobile });
    if (!user) {
      return genericError();
    }

    const matches = await bcrypt.compare(password, user.password);
    if (!matches) {
      return genericError();
    }

    const token = signToken(user._id);
    return res.json({ token, user: toSafeUser(user) });
  } catch (err) {
    next(err);
  }
});

router.get("/me", requireAuth, async (req, res, next) => {
  try {
    if (!(await connectOrFail(res))) return;

    const user = await UserModel.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    return res.json({ user: toSafeUser(user) });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
