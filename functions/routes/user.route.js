const express = require("express");
const userController = require("../controllers/user.controller");

const router = express.Router();

router.post("/create", userController.createUser);
router.get("/:id", userController.getUserById);

module.exports = router;
