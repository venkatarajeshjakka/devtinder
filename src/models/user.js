const mongoose = require("mongoose");

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
    },
    password: {
      type: String,
      required: true,
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

const User = mongoose.model("User", userSchema);

module.exports = User;
