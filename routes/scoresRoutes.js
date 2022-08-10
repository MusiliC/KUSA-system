const express = require("express");
const scoresController = require("../controllers/scoreController");
const router = express.Router();

const { authAdmin } = require("../middleware/auth");

router.post("/post", scoresController.postScores);
router.get("/", scoresController.allScores);
router.delete("/:id", scoresController.deleteScores);
router.patch("/:id", scoresController.updateScores);

module.exports = router;
