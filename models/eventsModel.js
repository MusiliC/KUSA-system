const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  date: {
    type: String,
  },
  host: {
    type: String,
  },
});

const Event = mongoose.model("Event", eventSchema);

exports.Event = Event;
