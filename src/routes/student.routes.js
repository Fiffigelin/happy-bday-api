const express = require("express");
const studentController = require("../controllers/student.controller");

const router = express.Router();

router.post("/student", studentController.addStudent);

module.exports = {
  routes: router,
};
