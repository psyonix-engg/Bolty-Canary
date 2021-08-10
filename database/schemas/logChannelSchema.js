const mongoose = require("mongoose");

const logChannelSchema = new mongoose.Schema({
  _id: String,
  // guildID: String,
  guildName: String,
  logChannelID: String,
});

module.exports = mongoose.model("LogChannel", logChannelSchema);
