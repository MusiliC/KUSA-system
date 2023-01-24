const mongoose = require("mongoose");

const resultsSchema = new mongoose.Schema({
  matchDate: {
    type: String,
  },
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
  homeTeamGoalScorer: {
    type: Array,
  },
  awayTeamGoalScorer: {
    type: Array,
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
    type: Array,
    default: "none",
  },
  homeTeamRedPlayers: {
    type: Array,
    default: "none",
  },
  awayTeamYellowPlayers: {
    type: Array,
    default: "none",
  },
  awayTeamRedPlayers: {
    type: Array,
    default: "none",
  },
});

const Result = mongoose.model("Result", resultsSchema);

exports.Result = Result;
