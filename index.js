const express = require("express");
const app = express();
const port = 3000;
const lb = require("./leaderboard.js");

app.set("view engine", "ejs");
app.get("/", (req, res) => {
  let promise = lb.getLeaderboard();
  promise.then(
    obj1 =>
      function() {
        console.log("loaded");

        res.render("index", {
          obj: obj1
        });
      },
    error => console.log("not loaded")
  );
});

app.listen(port, () => console.log(`App listening on port ${port}!`));
