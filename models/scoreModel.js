const mongoose = require("mongoose");

const scoreSchema = new mongoose.Schema({
  scorer: {
    type: String,
  },
  scorerTeam: {
    type: String,
  },
  scorerGoals: {
    type: Number,
  },
});

const Score = mongoose.model("Score", scoreSchema);

exports.Score = Score;
