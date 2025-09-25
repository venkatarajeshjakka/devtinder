const express = require("express");
const app = express();
const { errorMiddleware } = require("./middlewares/error-middleware");
const port = 3040;

//middleware
app.use((req, res, next) => {
  console.log("This is my Default middleware");
  console.log(
    `Request URL: ${req.url}, Request Type: ${req.method}, Time: ${new Date()}`
  );
  next();
});

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
