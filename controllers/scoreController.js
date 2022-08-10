const { validScores } = require("../helpers/scoreValidator");
const { Score } = require("../models/scoreModel");

//Get scores

async function allScores(req, res) {
  try {
    const scores = await Score.find({});
    res.status(200).send(scores);
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error);
  }
}

//post scores

async function postScores(req, res) {
  const { error } = validScores(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    //check if top scorer exist

    let topScorer = await Score.findOne({ scorer: req.body.scorer });

    if (topScorer)
      res.status(400).send("This player already exist update goals tally");
    else {
      const { scorer, scorerTeam, scorerGoals } = req.body;

      topScorer = new Score({
        scorer,
        scorerTeam,
        scorerGoals,
      });

      await topScorer.save();
    }

    //confirmation message

    res.status(200).send({
      message: "Details posted successful",
    });
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error);
  }
}

//delete top scorer info

async function deleteScores(req, res) {
  try {
    const scorer = await Score.findById(req.params.id);
    if (!scorer) return res.status(404).send("Player not found..");

    const deletePlayer = await Score.findByIdAndDelete(req.params.id);
    res.status(200).send({
      message: "Info deleted...",
    });
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error);
  }
}

//update top scorer info

async function updateScores(req, res) {
  try {
    const playerToUpdate = await Score.findById(req.params.id);
    if (!playerToUpdate) return res.status(404).send("Player not found..");

    const { scorer, scorerTeam, scorerGoals } = req.body;

    const updatedPlayer = await Score.findByIdAndUpdate(
      req.params.id,
      {
        scorer,
        scorerTeam,
        scorerGoals,
      },
      { new: true }
    );
    res.send(updatedPlayer);
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error);
  }
}


module.exports = {
  updateScores,
  allScores,
  deleteScores,
  postScores,
};
