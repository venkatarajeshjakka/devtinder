const express = require("express");
const app = express();
const User = require("./models/user");
const { loggingMiddleware, errorMiddleware } = require("./middlewares");
const connectToDatabase = require("./config/database");
const port = 3040;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//middleware
app.use(loggingMiddleware);

app.get(
  "/",
  (req, res, next) => {
    console.log("first middleware");
    next();
  },
  (req, res) => {
    res.contentType("application/json");
    res.send("Hello to my server!");
  }
);

app.post("/signup", async (req, res) => {
  const body = req.body;

  const user = new User(body);
  await user.save(); // Save the user to the database

  res.status(201).json({
    success: true,
    message: "User signed up successfully",
    user,
  });
});

//GET user by email
app.get("/user", async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }
  res.json({
    success: true,
    user,
  });
});

app.get("/feed", async (req, res) => {
  const users = await User.find();

  res.json({
    success: true,
    users,
  });
});

app.delete("/user/:id", async (req, res) => {
  const { id } = req.params;
  const user = await User.findByIdAndDelete(id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  res.json({
    success: true,
    message: "User deleted successfully",
    user,
  });
});

//Error Middleware
app.use(errorMiddleware);

// Connect to the database and then start the server
connectToDatabase()
  .then(() => {
    console.log("Database connection established, starting server...");
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to the database", error);
    process.exit(1); // Exit the process with an error code
  });
