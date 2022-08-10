const express = require("express");
const resultsController = require("../controllers/resultsController");
const router = express.Router();

const { authAdmin } = require("../middleware/auth");

router.post("/post", resultsController.postResults);
router.get("/", resultsController.allSResults);
router.delete("/:id", resultsController.deleteResults);
router.patch("/:id", resultsController.updateResults);

module.exports = router;
