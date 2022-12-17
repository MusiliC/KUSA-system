const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    teams: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Team",
    },
  },
  {
    timestamps: true,
  }
);

const Region = mongoose.model("Region", eventSchema);

module.exports = Region;
