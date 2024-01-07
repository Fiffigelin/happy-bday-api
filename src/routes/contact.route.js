const express = require("express");
const contactController = require("../controllers/contact.controller");

const router = express.Router();

router.post("/create", contactController.createContact);
router.get("/get", contactController.getContacts);
router.get("/:id", contactController.getContactById);
router.put("/update/:id", contactController.updateContact);
router.delete("/delete/:id", contactController.deleteContact);

module.exports = router;
