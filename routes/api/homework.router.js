const express = require("express");
const router = express.Router();

const homeworkController = require("../../controllers/homework.controller");

const homeworkValidators = require("../../validators/homework.validators");
const runValidations = require("../../validators/index.middleware");

router.get("/found/:classroomId",
  homeworkValidators.findHomeworkByClassroomIdValidator,
  runValidations,
  homeworkController.findByClassroomId
);

router.post("/",
  homeworkValidators.createHomeworkValidator,
  runValidations,
  homeworkController.create
);

router.put("/update/data/student/grade/:homeworkId",
  homeworkValidators.updateByHomeworkIdValidator,
  runValidations,
  homeworkController.updateByHomeworkId
);

router.get("/get/grade/:studentId/:homeworkId",
  homeworkValidators.findGradeByStudentAndHomeworkIdValidator,
  runValidations,
  homeworkController.findGradeByStudentAndHomeworkId
);

module.exports = router;
