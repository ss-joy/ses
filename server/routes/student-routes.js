const express = require("express");
const router = express.Router();

const studentController = require("../controllers/student-controller");

// router.get("/api/profile/:id", studentController.getStudentProfile);
router.post(
  "/api/student/enter-new-student",
  studentController.enterNewStudent
);

module.exports = router;
