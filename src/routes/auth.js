const express = require("express");
const bcrpt = require("bcrypt");
const User = require("../models/user");
const { validateSignUpData } = require("../utils/validation");

const authRouter = express.Router();

authRouter.post("/signup", validateSignUpData, async (req, res) => {
  const body = req.body;

  const passwordHash = await bcrpt.hash(body.password, 10);

  const updatedBody = { ...body, password: passwordHash };
  const user = new User(updatedBody);
  await user.save(); // Save the user to the database

  res.status(201).json({
    success: true,
    message: "User signed up successfully",
    user,
  });
});

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Invalid Credentials",
    });
  }

  const isPasswordValid = await user.validatePassword(password);

  if (!isPasswordValid) {
    return res.status(401).json({
      success: false,
      message: "Invalid Credentials",
    });
  }

  const token = user.getJWT();
  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "Strict",
    expires: new Date(Date.now() + 3600000), // 1 hour
  });

  res.json({
    success: true,
    message: "User logged in successfully",
  });
});

authRouter.post("/logout", (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.json({
    success: true,
    message: "User logged out successfully",
  });
});
module.exports = authRouter;
