const express = require("express");
const router = express.Router();


const gradeController = require("../../controllers/grade.controller");

const gradeValidators = require("../../validators/grade.validators");
const runValidations = require("../../validators/index.middleware");


router.post("/", 
gradeValidators.createGradeValidator, 
runValidations, 
gradeController.create);

router.get("/", gradeController.findAll);

router.get("/student/:studentId/guideline/:guidelineId", 
gradeValidators.findByStudentAndGuidelineIdValidator, 
runValidations, 
gradeController.findByStudentAndGuidelineId);

module.exports = router;
