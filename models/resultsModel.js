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
});

const Result = mongoose.model("Result", resultsSchema);

exports.Result = Result;
