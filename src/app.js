const express = require("express");
const app = express();

const { loggingMiddleware, errorMiddleware } = require("./middlewares");

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

app.get("/users", (req, res) => {
  res.contentType("application/json");
  res.send("This is the about page.");
});

//Error Middleware
app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
