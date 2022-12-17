const mongoose = require("mongoose");

const fixturesSchema = new mongoose.Schema({
  // fixture: {
  //   type: [[[mongoose.Schema.Types.ObjectId]]],
  //   ref: "Team",
  // },
  fixture: {
    type: [],
  },
  region: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Region",
  },
  status: {
    type: String,
    default: "active",
  },
});

const RegionFixture = mongoose.model("RegionFixture", fixturesSchema);

module.exports = RegionFixture;
