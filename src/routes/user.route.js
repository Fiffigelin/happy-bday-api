const express = require("express");
const userController = require("../controllers/user.controller");

const router = express.Router();

router.post("/create", userController.createUserController);
router.get("/get", userController.getUsers);
router.get("/:id", userController.getUserByUidController);
router.put("/update/:id", userController.updateUserController);
router.delete("/delete/:id", userController.deleteUserController);

module.exports = router;
