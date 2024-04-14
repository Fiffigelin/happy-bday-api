const express = require("express");
const contactController = require("../controllers/contact.controller");

const router = express.Router();

router.post("/create", contactController.createContactController);
router.get("/get", contactController.getContactsController);
router.get("/get/:id", contactController.getContactsByUserController);
router.get("/:id", contactController.getContactByIdController);
router.put("/update/:id", contactController.updateContactController);
router.put("/update-message", contactController.putMessageToContactController);
router.delete("/delete/:id", contactController.deleteContactController);

module.exports = router;
