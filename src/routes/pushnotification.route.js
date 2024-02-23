const express = require("express");
const notificationService = require("../controllers/notification.conroller");

const router = express.Router();

router.post("/register-token", notificationService.registerPushToken);
router.post("/send-notification", notificationService.sendSampleNotification);

module.exports = router;
