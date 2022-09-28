const express = require("express");
const resultsController = require("../controllers/resultsController");
const router = express.Router();

const { auth, authAdmin } = require("../middleware/auth");

router.post("/post", resultsController.postResults);
router.get("/", resultsController.allSResults);
router.get("/:id", resultsController.oneResult);
router.delete("/:id", resultsController.deleteResults);
router.patch("/:id", resultsController.updateResults);

module.exports = router;
