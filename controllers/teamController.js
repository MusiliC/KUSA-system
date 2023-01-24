const { validTeam } = require("../helpers/teamValidator");
const { Team } = require("../models/teamModel");
const crypto = require("crypto");

//Get teams

async function allTeams(req, res) {
  try {
    const teams = await Team.find({})
      .sort({
        wins: -1,
        draws: -1,
        lost: 1,
      })
      .populate("results");
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

//Get top two Teams

async function getTwoTeams(req, res) {
  try {
    const team = await Team.find({})
      .sort({
        wins: -1,
        draws: -1,
      })
      .limit(4)
      .populate("results");
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

  if (!req.files || !req.files.image)
    return res.status(400).send("Image is required");

  try {
    //check if team exists

    let registeredTeam = await Team.findOne({ team: req.body.team });
    if (registeredTeam)
      res.status(400).send("This institution is already registered..");
    else {
      const image = req.files.image;
      const randId = crypto.randomBytes(8).toString("hex");
      const imageName = randId + image.name;

      image.mv("uploads/" + imageName);

      const { team, county, players, wins, draws, lost } = req.body;

      registeredTeam = new Team({
        team,
        county,
        players,
        wins,
        draws,
        lost,
        image: imageName,
      });

      await registeredTeam.save();
    }

    //confirmation message

    res.status(200).send({
      message: "Team registered successful",
      team: registeredTeam,
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

    const { team, county, wins, draws, lost } = req.body;

    const updatedTeam = await Team.findByIdAndUpdate(
      req.params.id,
      {
        team,
        county,
        wins,
        draws,
        lost,
      },
      { new: true }
    );
    res.send(updatedTeam);
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error);
  }
}

async function updateWin(req, res) {
  try {
    const { id } = req.params;
    const updateResult = await Team.findByIdAndUpdate(
      id,
      {
        $inc: {
          wins: 1,
        },
      },
      { new: true }
    );
    res.send(updateResult);
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error);
  }
}

async function updateDraw(req, res) {
  try {
    const { team } = req.body;
    const updateResult = await Team.findByIdAndUpdate(
      req.params.id,
      {
        team,
        $inc: {
          draws: 1,
        },
      },
      { new: true }
    );
    res.send(updateResult);
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error);
  }
}

async function updateLost(req, res) {
  try {
    const { team } = req.body;
    const updateResult = await Team.findByIdAndUpdate(
      req.params.id,
      {
        team,
        $inc: {
          lost: 1,
        },
      },
      { new: true }
    );
    res.send(updateResult);
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error);
  }
}

module.exports = {
  registerTeam,
  getTwoTeams,
  allTeams,
  getTeam,
  deleteTeam,
  updateTeam,
  updateWin,
  updateDraw,
  updateLost,
};
