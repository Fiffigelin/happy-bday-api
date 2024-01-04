const express = require("express");
const imageController = require("../controllers/image.controller");

const router = express.Router();

router.get("/get", imageController.getImages);

module.exports = router;
