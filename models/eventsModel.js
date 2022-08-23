const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  img: {
    type: String,
  },
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
