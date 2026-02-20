const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World");
});
app.get("/about", function (req, res) {
  res.send("this is about page");
});
app.listen(3000, () => {
  console.log("server is running on port 3000...");
});
