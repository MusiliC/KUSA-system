const mongoose = require("mongoose");

const scoreSchema = new mongoose.Schema({
  scorer: {
    type: Array,
  },
  scorerTeam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team",
  },
  scorerGoals: {
    type: Number,
  },
});

const Score = mongoose.model("Score", scoreSchema);

exports.Score = Score;
