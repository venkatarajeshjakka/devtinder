const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "No token found",
    });
  }
  const JWT_SECRET = process.env.JWT_SECRET;
  try {
    const decodedToken = jwt.verify(token, JWT_SECRET, {
      algorithms: ["HS256"],
    });

    req.decodedToken = decodedToken;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid Token",
    });
  }
};

const validUser = async (req, res, next) => {
  const user = req.decodedToken;

  const existingUser = await User.findById(user._id);

  if (!existingUser) {
    return res.status(401).json({
      success: false,
      message: "User does not exist",
    });
  } else {
    req.user = existingUser;
    next();
  }
};
module.exports = { userAuth, validUser };
