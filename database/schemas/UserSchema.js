const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: mongoose.SchemaTypes.String,
  userID: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema);
