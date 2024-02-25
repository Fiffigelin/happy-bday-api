const express = require("express");
const notificationService = require("../controllers/notification.controller");

const router = express.Router();

router.post("/register-token", notificationService.registerPushToken);
router.post("/send-notification", notificationService.sendSampleNotification);

module.exports = router;
