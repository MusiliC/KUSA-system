const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  team: {
    type: String,
    unique: true,
  },
  county: {
    type: String,
  },
  players: {
    type: String,
  },
  image: {
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
  results: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Result",
    default: [],
  },
});

const Team = mongoose.model("Team", teamSchema);

exports.Team = Team;
