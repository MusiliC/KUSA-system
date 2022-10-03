const mongoose = require("mongoose");

const resultsSchema = new mongoose.Schema({
  homeTeam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team",
  },
  awayTeam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team",
  },
  homeTeamGoals: {
    type: Number,
  },
  awayTeamGoals: {
    type: Number,
  },
  homeTeamShots: {
    type: Number,
  },
  awayTeamShots: {
    type: Number,
  },
  homeTeamFouls: {
    type: Number,
  },
  awayTeamFouls: {
    type: Number,
  },
  homeTeamYellow: {
    type: Number,
  },
  awayTeamYellow: {
    type: Number,
  },
  homeTeamRed: {
    type: Number,
  },
  awayTeamRed: {
    type: Number,
  },
  homeTeamYellowPlayers: {
    type: String,
    default: "none",
  },
  homeTeamRedPlayers: {
    type: String,
    default: "none",
  },
  awayTeamYellowPlayers: {
    type: String,
    default: "none",
  },
  awayTeamRedPlayers: {
    type: String,
    default: "none",
  },
});

const Result = mongoose.model("Result", resultsSchema);

exports.Result = Result;
