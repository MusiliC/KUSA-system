const { validResults } = require("../helpers/resultsValidator");
const { Result } = require("../models/resultsModel");

//Get results

async function allSResults(req, res) {
  try {
    const results = await Result.find({});
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
    const { winningTeam, loosingTeam, winnerGoals, looserGoals } = req.body;

    let newResult = new Result({
      winningTeam,
      loosingTeam,
      winnerGoals,
      looserGoals,
    });

    await newResult.save();

    // let existingResult = await Result.findOne({ scorer: req.body.scorer });

    // if (topScorer)
    //   res.status(400).send("This player already exist update goals tally");
    // else {
    //   const { scorer, scorerTeam, scorerGoals } = req.body;

    //   topScorer = new Score({
    //     scorer,
    //     scorerTeam,
    //     scorerGoals,
    //   });

    //   await topScorer.save();
    // }

    //confirmation message

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

    const { winningTeam, loosingTeam, winnerGoals, looserGoals } = req.body;

    const updatedResults = await Result.findByIdAndUpdate(
      req.params.id,
      {
        winningTeam,
        loosingTeam,
        winnerGoals,
        looserGoals,
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
  deleteResults,
  postResults,
};
