const express = require("express");
const app = express();
const fs = require("fs");
const cron = require("node-cron");
const port = 3000;
const lb = require("./leaderboard");
app.set("view engine", "ejs");

cron.schedule("*/1 * * * *", async () => {
  let obj1 = [];
  let result = await lb.getLeaderboard(obj1);
  // console.log(result);
  fs.writeFile("data.json", JSON.stringify(result), function(err) {
    if (err) throw err;
  });
  console.log("updating the data.json every 1 minutes");
});

app.get("/", async (req, res) => {
  var lboard = JSON.parse(fs.readFileSync("./data.json", "utf8"));
  res.render("index", {
    obj: lboard
  });
});

app.listen(port, () => console.log(`App listening on port ${port}!`));
