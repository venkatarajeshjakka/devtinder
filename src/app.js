const express = require("express");
const app = express();
const User = require("./models/user");
const {
  loggingMiddleware,
  errorMiddleware,
  userAuth,
  validUser,
} = require("./middlewares");
const connectToDatabase = require("./config/database");
const { validateSignUpData } = require("./utils/validation");
const bcrpt = require("bcrypt");
const cookieParser = require("cookie-parser");

const port = 3040;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
//middleware
app.use(loggingMiddleware);

app.get("/", (req, res) => {
  res.contentType("application/json");
  res.send("Hello to my server!");
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Invalid Credentials",
    });
  }

  const isPasswordValid = await bcrpt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({
      success: false,
      message: "Invalid Credentials",
    });
  }

  const token = user.getJWT();
  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "Strict",
    expires: new Date(Date.now() + 3600000), // 1 hour
  });

  res.json({
    success: true,
    message: "User logged in successfully",
  });
});

app.get("/profile", userAuth, validUser, async (req, res) => {
  try {
    const user = req.user;

    res.json({
      success: true,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
});
app.post("/signup", validateSignUpData, async (req, res) => {
  const body = req.body;

  const passwordHash = await bcrpt.hash(body.password, 10);

  const updatedBody = { ...body, password: passwordHash };
  const user = new User(updatedBody);
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

app.patch("/user/:id", async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const user = await User.findByIdAndUpdate(id, body, {
    new: true,
    runValidators: true,
  });
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }
  res.json({
    success: true,
    message: "User updated successfully",
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
