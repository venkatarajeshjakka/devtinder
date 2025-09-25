const errorMiddleware = (err, req, res, next) => {
  if (err) {
    console.error(`Error in the stack:${err.stack}`);
    return res.status(500).json({
      success: false,
      errorType: "InternalServerError",
      message: "Something went wrong",
    });
  }
};

module.exports = { errorMiddleware };
