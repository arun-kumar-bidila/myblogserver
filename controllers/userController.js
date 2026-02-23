import express from "express";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sendMail from "../config/sendMail.js";
import PendingUser from "../models/pendingUser.js";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET);
};

const createOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const signUpUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const otp = createOtp();
    const hashedOtp = await bcrypt.hash(otp, 10);

    await PendingUser.findOneAndUpdate(
      { email },
      {
        name,
        email,  
        password: hashedPassword,
        otp: hashedOtp,
        otpExpiry: Date.now() + 10 * 60 * 1000,
      },
      { upsert: true },
    );

    await sendMail(email, otp);
    

    return res.status(201).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error occured in sending otp , Try Again" });
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const pendingUser = await PendingUser.findOne({ email });

    if (!pendingUser || !pendingUser.otp) {
      return res.status(400).json({ message: "Invalid request" });
    }

    if (pendingUser.otpExpiry < Date.now()) {
      return res.status(400).json({ message: "OTP expired" });
    }
    console.log(otp);

    const isMatch = await bcrypt.compare(otp, pendingUser.otp);
      if (!isMatch) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    const user = await User.create({
      name: pendingUser.name,
      email: pendingUser.email,
      password: pendingUser.password,
    });

    await PendingUser.deleteOne({ email });

    const token = createToken(user._id);

    return res.status(201).json({ user, accessToken: token });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error occured in otp Verification" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json({ message: "User Doesn't exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Password Incorrect" });
    }

    const token = createToken(user._id);

    return res.status(200).json({ accessToken: token, user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error occured in login" });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.userId).select("+password");

    if (!user) {
      return res
        .status(400)
        .json({ message: "User Failed in Change Password" });
    }

    const isCurrentPasswordVerified = await bcrypt.compare(
      currentPassword,
      user.password,
    );

    if (!isCurrentPasswordVerified) {
      return res
        .status(400)
        .json({ message: "Entered wrong current password" });
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;

    await user.save();

    return res.status(200).json({ message: "Password Changed Successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to Change Password" });
  }
};

export { signUpUser, loginUser, getUser, changePassword, verifyOtp };
