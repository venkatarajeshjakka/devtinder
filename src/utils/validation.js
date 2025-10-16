const vaidator = require("validator");

// Custom ValidationError class
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "RequestValidationError";
    this.statusCode = 400;
  }
}

const validateSignUpData = (req, res, next) => {
  // Validation logic for sign-up data
  const { firstName, lastName, email, password } = req.body;
  if (!firstName || !lastName || !email || !password) {
    throw new ValidationError(
      "FirstName, LastName, Email and Password fields are required"
    );
  }

  if (!vaidator.isEmail(email)) {
    throw new ValidationError("Invalid email format");
  }

  if (
    !vaidator.isStrongPassword(password, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
  ) {
    throw new ValidationError(
      "Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, one number, and one symbol"
    );
  }

  if (firstName.length < 4 || firstName.length > 50) {
    throw new ValidationError("First name a between 4 and 50 characters long");
  }

  next();
};

module.exports = { validateSignUpData };
