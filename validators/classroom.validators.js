const { body, param } = require("express-validator");
const validators = {};

validators.createClassroomValidator = [
    body("name")
        .notEmpty().withMessage("Name can(not) be empty"),
    body("teacher")
        .notEmpty().withMessage("Teacher can(not) be empty"),
    //body("student")
        //.notEmpty().withMessage("Student can(not) be empty")
]

validators.findClassroomByIdValidator = [
    param("identifier")
        .notEmpty().withMessage("Identifier can(not) be empty")
        .isMongoId().withMessage("Identifier must be mongo")
]

validators.findClassroomByTeacherIdValidator = [
    param("teacherId")
        .notEmpty().withMessage("Identifier can(not) be empty")
]

validators.deleteClassroomByIdentifierValidator = [
    param("identifier").notEmpty().withMessage("Identifier can(not) be empty"),
  ];

validators.findClassroomsByStudentIdValidator = [
    param("id")
        .notEmpty().withMessage("Identifier can(not) be empty"),
];

validators.findClassroomsByTeacherIdValidator = [
    param("teacherId")
        .notEmpty().withMessage("Identifier can(not) be empty"),
];

validators.addStudentToClassroomValidator = [
    body("studentId")
      .notEmpty()
      .withMessage("Identifier can(not) be empty")
      .isMongoId()
      .withMessage("Invalid student ID"),
    body("codeClassroom")
      .notEmpty()
      .withMessage("Code can(not) be empty")
  ];

module.exports = validators;
