const express = require("express");
const app = express();
const port = 3000;
const lb = require("./leaderboard.js");
app.set("view engine", "ejs");
app.get("/", (req, res) => {
  let obj1 = [];
  let obj2 = lb.getLeaderboard(obj1);

  console.log(obj2);

  res.render("index", {
    obj: obj2
  });
});

app.listen(port, () => console.log(`App listening on port ${port}!`));
