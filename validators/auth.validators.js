const { body, param } = require("express-validator");

const authValidators = {};

authValidators.signinValidator = [
  body("identifier")
    .notEmpty().withMessage("Identifier can(not) be empty"),
  body("password")
    .notEmpty().withMessage("Password can(not) be empty"),
]

authValidators.updateUserValidator = [
  param("id")
    .notEmpty().withMessage("User identifier can(not) be empty"),
  body("name")
    .notEmpty().withMessage("Name can(not) be empty"),
  body("email")
    .notEmpty().withMessage("Email can(not) be empty")
    .isEmail().withMessage("Invalid email format")
]

module.exports = authValidators;

