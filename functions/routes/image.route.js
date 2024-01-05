const express = require("express");
const imageController = require("../controllers/image.controller");

const router = express.Router();

router.post("/create", imageController.createImage);
router.get("/get", imageController.getImages);
router.get("/:id", imageController.getImageById);
router.get("/category/:category", imageController.getImageByCategory);
router.put("/update/:id", imageController.updateImage);
router.delete("/delete/:id", imageController.deleteImage);

module.exports = router;
