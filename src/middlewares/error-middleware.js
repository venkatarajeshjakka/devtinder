const errorMiddleware = (err, req, res, next) => {
  if (err) {
    switch (err.name) {
      // Handle Mongoose validation errors
      case "ValidationError":
        return res.status(400).json({
          success: false,
          errorType: "ValidationError",
          message: "Validation failed",
          details: Object.values(err.errors).map((e) => e.message),
        });

      // Handle Mongoose CastError (invalid ObjectId, etc.)
      case "CastError":
        return res.status(400).json({
          success: false,
          errorType: "CastError",
          message: "Invalid data format",
          details: err.message,
        });

      default:
        // Handle Mongoose duplicate key errors (unique constraint)
        if (err.code === 11000) {
          const field = Object.keys(err.keyPattern)[0];
          return res.status(400).json({
            success: false,
            errorType: "DuplicateKeyError",
            message: `${field} already exists`,
            details: err.message,
          });
        }

        // Default to 500 for unknown errors
        return res.status(500).json({
          success: false,
          errorType: "InternalServerError",
          message: "Something went wrong",
          details: err.message,
        });
    }
  }
};

module.exports = { errorMiddleware };
