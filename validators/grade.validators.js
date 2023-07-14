const { body, param } = require("express-validator");
const validators = {};

validators.createGradeValidator = [
  body("student")
    .notEmpty().withMessage("Student cannot be empty"),
  body("guidelines")
    .isArray({ min: 1 }).withMessage("Guidelines must be an array with 1 element")
    .notEmpty().withMessage("Guidelines can(not) be empty"),
  body("guidelines.*.guideline")
    .notEmpty().withMessage("Guideline ID cannot be empty"),
  body("guidelines.*.grade")
    .isNumeric().withMessage("Grade must be a numeric value")
    .notEmpty().withMessage("Grade can(not) be empty"),
  body("homework")
    .notEmpty().withMessage("Homework can(not) be empty")
];

validators.findByStudentAndGuidelineIdValidator = [
  param("studentId")
    .notEmpty().withMessage("Student ID can(not) be empty"),
  param("guidelineId")
    .notEmpty().withMessage("Guideline ID can(not) be empty")
];

module.exports = validators;
