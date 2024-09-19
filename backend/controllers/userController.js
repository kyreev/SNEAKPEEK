import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../config/jwtToken.js";

// Create a new user
export const createUser = asyncHandler(async (req, res) => {
  const { email } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: "User already exists",
    });
  }

  // Create new user
  const newUser = await User.create(req.body);
  res.status(201).json({
    success: true,
    message: "User created successfully",
    user: {
      _id: newUser._id,
      firstname: newUser.firstname,
      lastname: newUser.lastname,
      email: newUser.email,
      mobile: newUser.mobile,
      role: newUser.role,
    },
  });
});

// User login
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Find user by email
  const user = await User.findOne({ email });
  if (!user || !(await user.isPasswordMatched(password))) {
    return res.status(401).json({
      success: false,
      message: "Invalid credentials",
    });
  }

  // Successful login response with token
  res.status(200).json({
    success: true,
    message: "Login successful",
    user: {
      _id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      mobile: user.mobile,
      role: user.role,
      token: generateToken(user._id),
    },
  });
});

// Get all users
export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find();

  if (!users || users.length === 0) {
    return res.status(404).json({
      success: false,
      message: "No users found",
    });
  }

  res.status(200).json({
    success: true,
    users,
  });
});

// Get a user by ID
export const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  res.status(200).json({
    success: true,
    user: {
      _id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      mobile: user.mobile,
      role: user.role,
    },
  });
});

// Delete a user by ID
export const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id);
  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  await User.findByIdAndDelete(id);
  res.status(200).json({ success: true, message: "User deleted successfully" });
});
