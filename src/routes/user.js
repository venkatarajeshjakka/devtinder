const express = require("express");
const User = require("../models/user");
const router = express.Router();
const { userAuth, validUser } = require("../middlewares");
//GET user by email
router.get("/user", userAuth, validUser, async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  res.json({
    success: true,
    user,
  });
});

router.delete("/user/:id", userAuth, validUser, async (req, res) => {
  const { id } = req.params;
  const user = await User.findByIdAndDelete(id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  res.json({
    success: true,
    message: "User deleted successfully",
    user,
  });
});

router.patch("/user/:id", userAuth, validUser, async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const user = await User.findByIdAndUpdate(id, body, {
    new: true,
    runValidators: true,
  });
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }
  res.json({
    success: true,
    message: "User updated successfully",
    user,
  });
});
module.exports = router;
