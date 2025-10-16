const jwt = require("jsonwebtoken");

const userAuth = (req, res, next) => {
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
    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid Token",
    });
  }
};

module.exports = userAuth;
