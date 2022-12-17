const { validEvent } = require("../helpers/eventValidator");
const { Event } = require("../models/eventsModel");
var multer = require("multer");

//Get events

async function allEvents(req, res) {
  try {
    const events = await Event.find({});
    res.status(200).send(events);
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error);
  }
}

//get one event

async function oneEvent(req, res) {
  try {
    const events = await Event.findById(req.params.id);
    res.status(200).send(events);
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error);
  }
}



async function registerEvent(req, res) {
  const { error } = validEvent(req.body);
  if (error) return res.status(400).send(error.details[0].message);

 

  try {
    //check if event exists

    let registeredEvent = await Event.findOne({ name: req.body.name });
    if (registeredEvent)
      res.status(400).send("This event is already registered..");
    else {
      const { img, name, date, host } = req.body;

      registeredEvent = new Event({
        img,
        name,
        date,
        host,
      });

      await registeredEvent.save();
    }

    //confirmation message

    res.status(200).send({
      message: "Event registered successful",
    });
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error);
  }
}

//delete event

async function deleteEvent(req, res) {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).send("Event not found..");

    const deletedEvent = await Event.findByIdAndDelete(req.params.id);
    res.status(200).send({
      message: "Event deleted...",
    });
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error);
  }
}

async function updateEvent(req, res) {
  try {
    const eventToUpdate = await Event.findById(req.params.id);
    if (!eventToUpdate) return res.status(404).send("event not found..");

    const { img, name, date, host } = req.body;

    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      {
        img,
        name,
        date,
        host,
      },
      { new: true }
    );
    res.send(updatedEvent);
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error);
  }
}

module.exports = {
  registerEvent,
  allEvents,
  oneEvent,
  deleteEvent,
  updateEvent,
};
