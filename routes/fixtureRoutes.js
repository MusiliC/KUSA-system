const express = require("express");
const fixtureController = require("../controllers/fixtureControler");
const router = express.Router();

const { authAdmin } = require("../middleware/auth");

router.post("/register", fixtureController.uploadFixtures);
router.get("/", fixtureController.allFixtures);
router.get("/generate/:eventId", fixtureController.generateFixtures);

module.exports = router;
