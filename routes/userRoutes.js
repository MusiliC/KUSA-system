const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { authAdmin } = require("../middleware/auth");

router.post("/register", userController.createUser);
router.post("/sign", userController.signUser);
router.get("/", userController.getUsers);
router.delete("/:id", userController.deleteUser);

module.exports = router;
