const express = require("express");
const app = express();
var mongoose = require("mongoose");
const fs = require("fs");
const cron = require("node-cron");
const PORT = process.env.PORT || 3000;
const lb = require("./leaderboard");
app.set("view engine", "ejs");

cron.schedule("*/5 * * * *", async () => {
  let result = await lb.getLeaderboard(obj1);
  // console.log(result);
  //update db with new data here.
  fs.writeFile("data.json", JSON.stringify(result), function(err) {
    if (err) throw err;
  });
  console.log("updating the data.json every 5 minutes");
});

app.get("/", async (req, res) => {
  //populate data from db into a json object here.
  var lboard = JSON.parse(fs.readFileSync("./data.json", "utf8"));
  res.render("index", {
    obj: lboard
  });
});

app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
