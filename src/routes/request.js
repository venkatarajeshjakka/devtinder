const express = require("express");
const { userAuth, validUser } = require("../middlewares");
const router = express.Router();

router.get("/sendConnectRequest", userAuth, validUser, (req, res) => {
  const user = req.user;
  res.json({
    success: true,
    message: `${user.firstName} sent a connection request`,
  });
});

module.exports = router;
