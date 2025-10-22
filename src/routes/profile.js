const express = require("express");
const { userAuth, validUser } = require("../middlewares");

const router = express.Router();

router.get("/profile", userAuth, validUser, async (req, res) => {
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
module.exports = router;
