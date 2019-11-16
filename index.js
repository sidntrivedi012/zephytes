const express = require("express");
const app = express();
const port = 3000;
const lb = require("./leaderboard.js");

app.set("view engine", "ejs");
app.get("/", (req, res) => {
  lb.getLeaderboard();

  res.render("index", {
    obj: lb.obj
  });
  console.log(lb.obj);
});

app.listen(port, () => console.log(`App listening on port ${port}!`));
