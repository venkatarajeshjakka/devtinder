const express = require("express");
const app = express();
const port = 3040;

app.get("/", (req, res) => {
  res.contentType("application/json");
  res.send("Hello to my server!");
});

app.get("/about", (req, res) => {
  res.contentType("application/json");
  res.send("This is the about page.");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
