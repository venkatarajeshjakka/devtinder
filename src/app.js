const express = require("express");
const app = express();
const User = require("./models/user");
const { loggingMiddleware, errorMiddleware } = require("./middlewares");
const connectToDatabase = require("./config/database");

const cookieParser = require("cookie-parser");

const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");

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

//routes
app.use("/", authRouter);
app.use("/", userRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
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
