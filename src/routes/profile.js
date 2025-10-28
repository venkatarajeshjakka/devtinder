const express = require("express");
const { userAuth, validUser } = require("../middlewares");
const { validateProfileData } = require("../utils/validation");

const router = express.Router();

router.get("/profile/view", userAuth, validUser, async (req, res) => {
  try {
    const user = req.user;

    res.json({
      success: true,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
});

router.patch("/profile/edit", userAuth, validUser, async (req, res) => {
  try {
    if (!validateProfileData(req)) {
      return res.status(400).json({
        success: false,
        message: "Invalid fields in profile update",
      });
    }

    const user = req.user;

    Object.keys(req.body).forEach((field) => {
      user[field] = req.body[field];
    });

    await user.save();
    res.json({
      success: true,
      message: "Profile updated successfully",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
});
module.exports = router;
