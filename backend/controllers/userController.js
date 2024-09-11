import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

export const createUser = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: "User already exist",
    });
  }

  const newUser = await User.create(req.body);
  res.status(200).json({
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
