const express = require("express");
const teamController = require("../controllers/teamController");
const router = express.Router();

const { authAdmin } = require("../middleware/auth");

router.post("/register", teamController.registerTeam);
router.get("/", teamController.allTeams);
router.get("/:id", teamController.getTeam);
router.delete("/:id", teamController.deleteTeam);
router.patch("/:id", teamController.updateTeam);
router.patch("/win/:id", teamController.updateWin);
router.patch("/draw/:id", teamController.updateDraw);
router.patch("/lost/:id", teamController.updateLost);

module.exports = router;
