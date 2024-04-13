const express = require("express");
const messageController = require("../controllers/message.controller");

const router = express.Router();

router.post("/create", messageController.createMessageController);
router.get("/get/user-msg/:id", messageController.getMessagesByUserController);
router.get(
  "/get/contact-msg/:id",
  messageController.getMessageByContactController
);
router.get("/get-msg/:id", messageController.getMessageByIdController);

module.exports = router;
