const robin = require("roundrobin");
const { validateRegionBody } = require("../helpers/region.validator");
const RegionFixture = require("../models/region-fixtures.model");

const Region = require("../models/region.model");
const { Team } = require("../models/teamModel");

//Get regions
const getRegionsController = async (req, res) => {
  try {
    const regions = await Region.find({}).populate({
      path: "teams",
      options: { sort: { wins: -1, draws: -1, lost: -1 } },
    });
    res.status(200).send(regions);
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error);
  }
};

//Get top regions
const getTopRegionsController = async (req, res) => {
  try {
    const regions = await Region.find({}).populate({
      path: "teams",
      options: { limit: 2, sort: { wins: -1, draws: -1, lost: -1 } },
    });

    res.status(200).send(regions);
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error);
  }
};

//get one region
const getOneRegionControler = async (req, res) => {
  try {
    const region = await Region.findById(req.params.id).populate("teams");
    res.status(200).send(region);
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error);
  }
};

const addRegionControler = async (req, res) => {
  const { error } = validateRegionBody(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    //check if region exists

    let registeredRegion = await Region.findOne({ name: req.body.name });
    if (registeredRegion)
      return res.status(400).send("This region is already registered..");

    const { name, description, teams } = req.body;

    registeredRegion = await Region.create({
      name,
      description,
      teams,
    });

    //confirmation message

    res.status(200).send({
      message: "Region registered successful",
      region: registeredRegion,
    });
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error);
  }
};

const generateOneRegionFixturesController = async (req, res) => {
  const { regionId, date } = req.params;
  // console.log(eventId);
  const region = await Region.findById(regionId).populate("teams");

  if (!region) {
    return res.status(400).send({ message: "Region with given id not found" });
  }
  const { teams } = region;

  if (teams?.length < 3)
    return res.status(400).send({
      message:
        "This region has less than 3 teams. Please add more teams to generate fixture",
    });

  let fixture = await RegionFixture.findOne({
    status: "active",
    region: regionId,
  });

  if (fixture) {
    return res
      .status(400)
      .send({ message: "You have an active fixture for this region" });
  }

  const teamsData = teams.reduce((ids, value) => [...ids, value._id], []);
  const tournaments = robin(teamsData.length, teamsData);

  const startDate = new Date(date);

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
  fixture = await RegionFixture.create({
    fixture: fixtureData,
    region: regionId,
  });
  res.send({ result: fixtureData });
};

//Get fixtures

async function getRegionFixturesController(req, res) {
  const { status, region } = req.query;
  let where = {};

  if (status) {
    where.status = status;
  }
  if (region) {
    where.region = region;
  }
  try {
    const fixtures = await RegionFixture.find(where).populate("region");
    res.status(200).send({ fixtures });
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error);
  }
}

async function updateRegion(req, res) {
  try {
    const { name, description, teams } = req.body;

    const updatedRegion = await Region.findByIdAndUpdate(
      req.params.id,
      {
        name,
        description,
        teams,
      },
      { new: true }
    );
    res.send(updatedRegion);
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error);
  }
}

module.exports = {
  getRegionsController,
  getTopRegionsController,
  getOneRegionControler,
  addRegionControler,
  generateOneRegionFixturesController,
  getRegionFixturesController,
  updateRegion,
};
