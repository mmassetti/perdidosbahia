const express = require("express");

const app = express();
express.json();

app.get("/", (req, res, next) => {
  res.send("Hello world");
});
app.listen(3000);
