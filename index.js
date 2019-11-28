const express = require("express");
const app = express();
const port = 3000;
const lb = require("./leaderboard");
app.set("view engine", "ejs");

app.get("/", async (req, res) => {
  let obj1 = [];
  let result = await lb.getLeaderboard(obj1);
  // console.log(result);
  // console.log(lb.lboard);
  // res.render("index", {
  //   obj: lb.lboard
  // });
});

app.listen(port, () => console.log(`App listening on port ${port}!`));
