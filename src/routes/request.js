const express = require("express");
const { userAuth, validUser } = require("../middlewares");
const router = express.Router();

const ConnectionRequest = require("../models/connectionRequest");

router.post(
  "/request/send/:status/:toUserId",
  userAuth,
  validUser,
  async (req, res) => {
    try {
      console.log(req.user);
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      if (fromUserId.toString() === toUserId.toString()) {
        return res
          .status(400)
          .json({ success: false, message: "Cannot send request to yourself" });
      }

      const existingRequest = await ConnectionRequest.findOne({
        fromUserId,
        toUserId,
      });

      if (existingRequest) {
        return res.status(400).json({
          success: false,
          message: "Connection request already sent to this user",
        });
      }

      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });

      await connectionRequest.save();

      res.json({
        success: true,
        message: `${req.user.firstName} sent a connection request successfully`,
      });
    } catch (err) {
      console.error("error occured", err);
      return res.status(500).json({ success: false, message: "Server Error" });
    }
  }
);

module.exports = router;
