const mongoose = require("mongoose");

const fixturesSchema = new mongoose.Schema({
  // fixture: {
  //   type: [[[mongoose.Schema.Types.ObjectId]]],
  //   ref: "Team",
  // },
  fixture: {
    type: [],
  },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
  },
  status: {
    type: String,
    default: "active",
  },
});

const Fixture = mongoose.model("Fixture", fixturesSchema);

exports.Fixture = Fixture;
