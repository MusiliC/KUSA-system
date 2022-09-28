const express = require("express");
const scoresController = require("../controllers/scoreController");
const router = express.Router();

const {auth, authAdmin } = require("../middleware/auth");

router.post("/post",scoresController.postScores);
router.get("/",  scoresController.allScores);
router.get("/:id", scoresController.oneScore);
router.delete("/:id",scoresController.deleteScores);
router.patch("/:id", scoresController.updateScores);

module.exports = router;
