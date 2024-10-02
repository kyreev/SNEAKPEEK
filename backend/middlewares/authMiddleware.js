import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";

// Middleware to authenticate users with JWT
export const authMiddleware = asyncHandler(async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    const token = req.headers.authorization.split(" ")[1];

    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id);

        if (user) {
          req.user = user;
          return next();
        } else {
          return res.status(401).json({
            success: false,
            message: "User not found",
          });
        }
      } catch (error) {
        return res.status(401).json({
          success: false,
          message: "Invalid token",
        });
      }
    }
  }

  return res.status(401).json({
    success: false,
    message: "No token provided, authorization denied",
  });
});
