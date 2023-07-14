const { body, param } = require("express-validator");
const validators = {};

validators.createHomeworkValidator = [
    body("name")
        .notEmpty().withMessage("Name can(not) be empty"),
    body("classroom")
        .notEmpty().withMessage("Classroom can(not) be empty"),
    //body("rubric")
        //.notEmpty().withMessage("Rubric can(not) be empty")
]

validators.findHomeworkByClassroomIdValidator = [
    param("classroomId")
        .notEmpty().withMessage("Classroom can(not) be empty")
]

validators.updateByHomeworkIdValidator = [
    param("homeworkId")
        .notEmpty().withMessage("Homework ID can(not) be empty"),
    body("studentId")
        .notEmpty().withMessage("Student ID can(not) be empty"),
    body("grade")
        .isNumeric().withMessage("Grade must be a number")
  ];

validators.findGradeByStudentAndHomeworkIdValidator = [
    param("studentId")
        .notEmpty().withMessage("Student ID can(not) be empty")
        .isMongoId().withMessage("Invalid Student ID"),
    param("homeworkId")
        .notEmpty().withMessage("Homework ID can(not) be empty")
        .isMongoId().withMessage("Invalid Homework ID")
  ];
module.exports = validators;