const express = require("express");
const messageController = require("../controllers/message.controller");

const router = express.Router();

router.post("/create", messageController.createMessage);
router.get("/get/user-msg/:id", messageController.getMessagesByUser);
router.get("/get/contact-msg/:id", messageController.getMessageByContact);
router.get("/get-msg/:id", messageController.getMessageById);

module.exports = router;
