const { validTeam } = require("../helpers/teamValidator");
const { Team } = require("../models/teamModel");

//Get teams

async function allTeams(req, res) {
  try {
    const teams = await Team.find({});
    res.status(200).send(teams);
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error);
  }
}

//Get one Team

async function getTeam(req, res) {
  try {
    const team = await Team.findById(req.params.id);
    res.status(200).send(team);
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error);
  }
}

//register team

async function registerTeam(req, res) {
  const { error } = validTeam(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    //check if team exists

    let registeredTeam = await Team.findOne({ team: req.body.team });
    if (registeredTeam)
      res.status(400).send("This institution is already registered..");
    else {
      const { team, county, town } = req.body;

      registeredTeam = new Team({
        team,
        county,
        town,
      });

      await registeredTeam.save();
    }

    //confirmation message

    res.status(200).send({
      message: "Team registered successful",
    });
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error);
  }
}

async function deleteTeam(req, res) {
  try {
    const team = await Team.findById(req.params.id);
    if (!team) return res.status(404).send("Team not found..");

    const deletedTeam = await Team.findByIdAndDelete(req.params.id);
    res.status(200).send({
      message: "Team deleted...",
    });
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error);
  }
}

async function updateTeam(req, res) {
  try {
    const teamToUpdate = await Team.findById(req.params.id);
    if (!teamToUpdate) return res.status(404).send("Team not found..");

    const { team, county, town } = req.body;

    const updatedTeam = await Team.findByIdAndUpdate(
      req.params.id,
      {
        team,
        county,
        town,
      },
      { new: true }
    );
    res.send(updatedTeam);
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error);
  }
}

module.exports = {
  registerTeam,
  allTeams,
  getTeam,
  deleteTeam,
  updateTeam,
};
