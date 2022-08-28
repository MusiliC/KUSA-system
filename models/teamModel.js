const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  team: {
    type: String,
    unique: true,
  },
  county: {
    type: String,
  },
  wins: {
    type: Number,
    default: 0,
  },
  lost: {
    type: Number,
    default: 0,
  },
  draws: {
    type: Number,
    default: 0,
  },
});

const Team = mongoose.model("Team", teamSchema);

exports.Team = Team;
