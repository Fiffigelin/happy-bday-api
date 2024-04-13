const express = require("express");
const imageController = require("../controllers/image.controller");

const router = express.Router();

router.post("/create", imageController.createImageController);
router.get("/get", imageController.getImagesController);
router.get("/:id", imageController.getImageByIdController);
router.get("/category/:category", imageController.getImageByCategoryController);
router.put("/update/:id", imageController.updateImageController);
router.delete("/delete/:id", imageController.deleteImageController);

module.exports = router;
