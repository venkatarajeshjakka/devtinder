const mongoose = require("mongoose");
require("dotenv").config();

const dbUrl = process.env.DATABASE_URL;

const connectToDatabase = async () => {
  try {
    await mongoose.connect(dbUrl);
    console.log("✅ MongoDB connected successfully!");
  } catch (error) {
    console.error("Error connecting to the database", error);
  }
};

module.exports = connectToDatabase;
