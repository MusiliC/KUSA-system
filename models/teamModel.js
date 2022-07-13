const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  team: {
    type: String,
    unique: true,
  },
  county: {
    type: String,
  },
  town: {
    type: String,
  },
});

const Team = mongoose.model("Team", teamSchema);

exports.Team = Team;
