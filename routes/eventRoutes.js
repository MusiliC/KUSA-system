const express = require("express");
const eventController = require("../controllers/eventController");
const router = express.Router();

const { auth, authAdmin } = require("../middleware/auth");

router.post ("/register",  eventController.registerEvent);
router.get("/", eventController.allEvents);
router.get("/:id", eventController.oneEvent);
router.delete("/:id", eventController.deleteEvent);
router.patch("/:id", eventController.updateEvent);

module.exports = router;
