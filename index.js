const express = require("express");
const app = express();
var mongoose = require("mongoose");
const fs = require("fs");
const cron = require("node-cron");
const PORT = process.env.PORT || 3000;
const lb = require("./leaderboard");
app.set("view engine", "ejs");
const options = {
  autoIndex: false, // Don't build indexes
  reconnectTries: 100, // Never stop trying to reconnect
  reconnectInterval: 500, // Reconnect every 500ms
  poolSize: 10, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0
};
mongoose.connect(process.env.DB_URL, options);
var userData = require("./model/data");

cron.schedule("*/0.5 * * * *", async () => {
  console.log("Updating data every 5 mins.");
  let obj1 = [];
  let result = await lb.getLeaderboard(obj1);
  // console.log(result);
  //update db with new data here.
  await result.forEach(user => {
    //creating schema for user to be inserted/updated
    let data = userData({
      name: user.contributor,
      commits: user.commits
    });
    //checking if the user already exists
    userData.findOne(
      {
        name: data.name
      },
      function(err, user) {
        if (user) {
          //if exists, update instead of insert
          userData.updateOne(user, { commits: data.commits }, function(err) {
            if (err) {
              console.log(err);
            }
            console.log("User updated");
          });
        } else {
          //if new user, creating a new field and inserting into db
          data.save(function(err) {
            if (err) throw err;
            console.log("User data inserted");
          });
        }
      }
    );
  });
});

app.get("/", async (req, res) => {
  //populate data from db into a json object here.
  userData
    .find({}, function(err, users) {
      if (err) throw err;
      console.log(users);
      res.render("index", {
        obj: users
      });
    })
    .sort({ commits: -1 });
});

app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
