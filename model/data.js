const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
  name: String,
  commits: Number
});
var User = mongoose.model("User", userSchema);

// make this available to our users in our Node applications
module.exports = User;
