const express = require("express");
const app = express();

const { loggingMiddleware, errorMiddleware } = require("./middlewares");
const connectToDatabase = require("./config/database");
const port = 3040;

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

app.get("/users", async (req, res) => {
  res.contentType("application/json");
  res.send("This is the about page.");
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
