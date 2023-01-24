const { validResults } = require("../helpers/resultsValidator");
const { Result } = require("../models/resultsModel");
const { Team } = require("../models/teamModel");

//Get results

async function allSResults(req, res) {
  try {
    const results = await Result.find({}).populate("homeTeam awayTeam");
    res.status(200).send(results);
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error);
  }
}

//one result

async function oneResult(req, res) {
  try {
    const results = await Result.findById(req.params.id);
    res.status(200).send(results);
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error);
  }
}

//post results

async function postResults(req, res) {
  const { error } = validResults(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const {
      matchDate,
      homeTeam,
      awayTeam,
      homeTeamGoals,
      awayTeamGoals,
      homeTeamGoalScorer,
      awayTeamGoalScorer,
      homeTeamShots,
      homeTeamFouls,
      homeTeamYellow,
      homeTeamRed,
      homeTeamYellowPlayers,
      homeTeamRedPlayers,
      awayTeamShots,
      awayTeamFouls,
      awayTeamYellow,
      awayTeamRed,
      awayTeamYellowPlayers,
      awayTeamRedPlayers,
    } = req.body;

    let newResult = new Result({
      matchDate,
      homeTeam,
      awayTeam,
      homeTeamGoals,
      awayTeamGoals,
      homeTeamGoalScorer,
      awayTeamGoalScorer,
      homeTeamShots,
      homeTeamFouls,
      homeTeamYellow,
      homeTeamRed,
      homeTeamYellowPlayers,
      homeTeamRedPlayers,
      awayTeamShots,
      awayTeamFouls,
      awayTeamYellow,
      awayTeamRed,
      awayTeamYellowPlayers,
      awayTeamRedPlayers,
    });

    await newResult.save();

    const homeTeam_ = await Team.findById(homeTeam);
    const awayTeam_ = await Team.findById(awayTeam);

    if (homeTeam_) {
      const win = homeTeamGoals > awayTeamGoals ? 1 : 0;
      const draw = homeTeamGoals === awayTeamGoals ? 1 : 0;
      const lose = homeTeamGoals < awayTeamGoals ? 1 : 0;

      await Team.findByIdAndUpdate(homeTeam, {
        $set: {
          results: [...homeTeam_.results, newResult.id],
        },
        $inc: {
          draws: draw,
          wins: win,
          lost: lose,
        },
      });
    }

    if (awayTeam_) {
      const win = awayTeamGoals > homeTeamGoals ? 1 : 0;
      const draw = homeTeamGoals === awayTeamGoals ? 1 : 0;
      const lose = homeTeamGoals > awayTeamGoals ? 1 : 0;

      await Team.findByIdAndUpdate(awayTeam, {
        $set: {
          results: [...awayTeam_.results, newResult.id],
        },
        $inc: {
          draws: draw,
          wins: win,
          lost: lose,
        },
      });
    }

    res.status(200).send({
      message: "Results  posted successful",
    });
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error);
  }
}

//delete results info

async function deleteResults(req, res) {
  try {
    // const scorer = await Score.findById(req.params.id);
    // if (!scorer) return res.status(404).send("Player not found..");

    const resultsDelete = await Result.findByIdAndDelete(req.params.id);
    res.status(200).send({
      message: "Results deleted...",
    });
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error);
  }
}

//update results info

async function updateResults(req, res) {
  try {
    // const playerToUpdate = await Score.findById(req.params.id);
    // if (!playerToUpdate) return res.status(404).send("Player not found..");

    const {
      homeTeam,
      awayTeam,
      homeTeamGoals,
      awayTeamGoals,
      homeTeamShots,
      homeTeamFouls,
      homeTeamYellow,
      homeTeamRed,
      homeTeamYellowPlayers,
      homeTeamRedPlayers,
      awayTeamShots,
      awayTeamFouls,
      awayTeamYellow,
      awayTeamRed,
      awayTeamYellowPlayers,
      awayTeamRedPlayers,
    } = req.body;

    const updatedResults = await Result.findByIdAndUpdate(
      req.params.id,
      {
        homeTeam,
        awayTeam,
        homeTeamGoals,
        awayTeamGoals,
        homeTeamShots,
        homeTeamFouls,
        homeTeamYellow,
        homeTeamRed,
        homeTeamYellowPlayers,
        homeTeamRedPlayers,
        awayTeamShots,
        awayTeamFouls,
        awayTeamYellow,
        awayTeamRed,
        awayTeamYellowPlayers,
        awayTeamRedPlayers,
      },
      { new: true }
    );
    res.send(updatedResults);
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error);
  }
}

module.exports = {
  updateResults,
  allSResults,
  oneResult,
  deleteResults,
  postResults,
};
