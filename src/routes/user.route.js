const express = require("express");
const userController = require("../controllers/user.controller");

const router = express.Router();

router.post("/create", userController.createUser);
router.get("/get", userController.getUsers);
router.get("/:id", userController.getUserById);
router.put("/update/:id", userController.updateUser);
router.delete("/delete/:id", userController.deleteUser);

module.exports = router;
