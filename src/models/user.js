const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 100,
    },
    lastName: { type: String },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid Email address");
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Password is not strong enough");
        }
      },
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      enum: ["male", "female", "others"],
    },
    photoUrl: { type: String },
    bio: { type: String },
    skills: { type: [String] },
  },
  { timestamps: true }
);

userSchema.methods.getJWT = function () {
  const user = this;
  const JWT_SECRET = process.env.JWT_SECRET;
  const token = jwt.sign({ _id: user._id, email: user.email }, JWT_SECRET, {
    expiresIn: "1h",
    algorithm: "HS256",
  });

  return token;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
