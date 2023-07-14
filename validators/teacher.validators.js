const { body, param } = require("express-validator");
const validators = {};
const passwordRegexp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,32})/

validators.registerTeacherValidator = [
    body("name")
        .notEmpty().withMessage("Name can(not) be empty")
        .isLength({ min:4, max: 180}).withMessage("The name must have between 4 and 180 characters"),
    body("email")
        .notEmpty().withMessage("Email can(not) be empty")
        .isLength({ max: 280 }).withMessage("Email can(not) exceed 280 characters")
        .isEmail().withMessage("The format can(not) be like this"),
    body("password")
        .notEmpty().withMessage("password can(not) be empty")
        .matches(passwordRegexp).withMessage("The password must have between 8 and 32 characters, and at least 1 upper case, 1 lower case and 1 special symbol"),
    //body("avatar")
        //.notEmpty().withMessage("avatar can(not) be empty")
]//1

validators.findTeacherByIdValidator = [
    param("identifier")
        .notEmpty().withMessage("Identifier can(not) be empty")
        .isMongoId().withMessage("Identifier must be mongo")
]

validators.updateTeacherValidator = [
    param("token")
      .notEmpty().withMessage("Token can(not) be empty"),
    body()
      .custom((value, { req }) => {
        if (!value.name && !value.email) {
          throw new Error("At least one of 'name' or 'email' must be provided");
        }
        return true;
      }),
    body("name")
      .optional()
      .if(body("name").exists())
      .notEmpty().withMessage("Name can(not) be empty")
      .isLength({ min: 4, max: 180 })
      .withMessage("The name must have between 4 and 180 characters"),
    body("email")
      .optional()
      .if(body("email").exists())
      .notEmpty().withMessage("Email can(not) be empty")
      .isLength({ max: 280 }).withMessage("Email can(not) exceed 280 characters")
      .isEmail().withMessage("The format can(not) be like this"),
  ];
  
  validators.deleteTeacherValidator = [
    param("token")
      .notEmpty().withMessage("Token can(not) be empty")
  ];

  validators.findTeacherByTokenValidator = [
    param("token").notEmpty().withMessage("Token can(not) be empty"),
  ];
  
  validators.updateImageValidator = [
    param("identifier")
      .notEmpty().withMessage("Identifier can(not) be empty")
      .isMongoId().withMessage("Identifier must be a valid MongoDB ID"),
    body("avatar")
      .notEmpty().withMessage("Avatar can(not) be empty")
  ];
  
  

module.exports = validators;