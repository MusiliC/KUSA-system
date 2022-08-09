const mongoose = require("mongoose");

const resultsSchema = new mongoose.Schema({
  winningTeam: {
    type: String,
    unique: true,
  },
  loosingTeam: {
    type: String,
  },
  winnerGoals: {
    type: Number,
  },
  looserGoals: {
    type: Number,
  },
});

const Result = mongoose.model("Result", resultsSchema);

exports.Result = Result;
