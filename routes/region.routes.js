const express = require("express");
const router = express.Router();

const { auth, authAdmin } = require("../middleware/auth");
const {
  addRegionControler,
  getRegionsController,
  getOneRegionControler,
  generateOneRegionFixturesController,
  getRegionFixturesController,
  updateRegion,
  getTopRegionsController,
} = require("../controllers/regions.controller");

router.post("/", addRegionControler);
router.get("/", getRegionsController);
router.get("/two", getTopRegionsController);
router.get("/fixtures", getRegionFixturesController);
router.get("/:id", getOneRegionControler);
router.patch("/:id", updateRegion);
router.post("/fixtures/:regionId/:date", generateOneRegionFixturesController);

module.exports = router;
