const { body, param } = require("express-validator");
const validators = {};

validators.createRubricValidator = [
    body("guidelines")
      .isArray({ min: 1 }).withMessage("Guidelines must be an array with 1 element"),
    body("guidelines.*.name")
      .notEmpty().withMessage("Name can(not) be empty"),
    body("guidelines.*.percentage")
      .notEmpty().withMessage("Percentage can(not) be empty")
      .isInt({ min: 1, max: 100 }).withMessage("Not in the range")
  ];

  validators.getRubricByIdValidator = [
    param("identifier")
      .notEmpty().withMessage("Identifier can(not) be empty")
      .isMongoId().withMessage("Identifier must be mongo")
  ];

  module.exports = validators;