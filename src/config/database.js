const mongoose = require("mongoose");
require("dotenv").config();

const dbUrl = process.env.DATABASE_URL;

const databaseName = process.env.DATABASE_NAME;

// Function to connect to the database

const connectToDatabase = async () => {
  try {
    const fullDbUrl = `${dbUrl}${databaseName}`;
    await mongoose.connect(fullDbUrl);
    console.log("✅ MongoDB connected successfully!");
  } catch (error) {
    console.error("Error connecting to the database", error);
  }
};

module.exports = connectToDatabase;
