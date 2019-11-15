const express = require("express");
const app = express();
const port = 3000;
var path = require("path");
const lb = require("./leaderboard.js");

app.set("view engine", "ejs");
app.get("/", (req, res) => {
  lb.getLeaderboard();

  res.render("index", {
    obj: lb.obj
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
