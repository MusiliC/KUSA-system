const { Fixture } = require("../models/fixturesModel");
const { validFixtures } = require("../helpers/fixturesValidator");
const { Team } = require("../models/teamModel");
const { Event } = require("../models/eventsModel");
const robin = require("roundrobin");

const generateFixtures = async (req, res) => {
  const { eventId } = req.params;
  // console.log(eventId);
  const event = await Event.findById(eventId);

  if (!event) {
    return res.status(400).send({ message: "Event with given id not found" });
  }

  let fixture = await Fixture.findOne({ status: "active", event: eventId });

  if (fixture) {
    return res
      .status(400)
      .send({ message: "You have an active fixture for this event" });
  }

  const teams = await Team.find({});
  const teamsData = teams.reduce((ids, value) => [...ids, value._id], []);
  const tournaments = robin(teamsData.length, teamsData);

  const startDate = new Date(event.date);

  const fixtureData = await Promise.all(
    tournaments.map(async (tourn, i) => {
      const nextDate = new Date(startDate);
      let id = Math.ceil(Math.random() * 10000000);
      nextDate.setDate(nextDate.getDate() + i);

      const teamObj = await Promise.all(
        tourn.map(async (t, i) => {
          const time = i == 0 ? "9:00 AM" : i === 1 ? "12:00 PM" : "15:30 PM";

          const awayTeam = await Team.findById(t[0]);
          const homeTeam = await Team.findById(t[1]);
          let id2 = Math.ceil(Math.random() * 10000000);

          return {
            id: id2,
            time,
            awayTeam: {
              _id: awayTeam._id,
              team: awayTeam.team,
            },
            homeTeam: {
              _id: homeTeam._id,
              team: homeTeam.team,
            },
          };
        })
      );
      return { [nextDate.toISOString()]: teamObj, id };
    })
  );
  //
  // save to db if no fixture is active
  //
  fixture = await Fixture.create({
    fixture: fixtureData,
    event: eventId,
  });
  res.send({ result: fixtureData });
};

async function uploadFixtures(req, res) {
  const { error } = validFixtures(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const {
      matchDayOne,
      matchDayTwo,
      matchDayThree,
      matchDayFour,
      matchDayFive,
    } = req.body;

    let newFixtures = new Fixture({
      matchDayOne,
      matchDayTwo,
      matchDayThree,
      matchDayFour,
      matchDayFive,
    });

    await newFixtures.save();

    //confirmation message

    res.status(200).send({
      message: "Fixtures uploaded successful",
    });
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error);
  }
}

//Get fixtures

async function allFixtures(req, res) {
  const { status, event } = req.query;
  let where = {};

  if (status) {
    where.status = status;
  }
  if (event) {
    where.event = event;
  }
  try {
    const fixtures = await Fixture.find(where).populate("event");
    res.status(200).send({ fixtures });
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error);
  }
}

//delete fixtures

async function deleteFixtures(req, res) {
  try {
    const fixtureDelete = await Fixture.findByIdAndDelete(req.params.id);
    res.status(200).send({
      message: "Fixtures deleted...",
    });
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error);
  }
}

module.exports = {
  uploadFixtures,
  allFixtures,
  generateFixtures,
  deleteFixtures,
};
