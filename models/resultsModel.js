const mongoose = require("mongoose");

const resultsSchema = new mongoose.Schema({
  homeTeam: {
    type: String,
    unique: false,
  },
  awayTeam: {
    type: String,
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
