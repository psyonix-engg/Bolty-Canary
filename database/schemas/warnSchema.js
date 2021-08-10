const mongoose = require("mongoose");

let warnSchema = new mongoose.Schema({
  GuildID: String,
  User: String,
  Content: Array,
});

module.exports = mongoose.model("warns", warnSchema);
