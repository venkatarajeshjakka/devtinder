const express = require("express");
const { userAuth, validUser } = require("../middlewares");
const router = express.Router();
const User = require("../models/user");
const ConnectionRequest = require("../models/connectionRequest");

router.post(
  "/request/send/:status/:toUserId",
  userAuth,
  validUser,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      const allowedStatus = ["ignored", "interested"];
      const isAllowed = allowedStatus.includes(status);

      if (!isAllowed) {
        return res.status(400).json({
          success: false,
          message: `Status must be one of the following: ${allowedStatus.join(
            ", "
          )}`,
        });
      }

      const toUser = await User.findById(toUserId);

      if (!toUser) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }

      const existingRequest = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
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
