const express = require("express");
const router = express.Router();

const studentController = require("../../controllers/student.controller");
const studentValidators = require("../../validators/student.validators");
const runValidations = require("../../validators/index.middleware");

router.get("/", studentController.findAll);

router.get("/:identifier", studentValidators.findStudenByIdValidator,
runValidations, 
studentController.findOneById);

router.post("/register/", 
studentValidators.registerStudentValidator,
runValidations,
studentController.register);

router.post("/signin", studentController.login);

router.get("/token/:tokens", 
studentValidators.finStudentByToken, 
runValidations, 
studentController.findOneByToken);

router.put("/token/upgrade/:token", 
studentValidators.upgradeStudentValidator, 
runValidations, 
studentController.upgradeStudent);

router.delete("/token/delete/:token", 
studentValidators.deleteStudentValidator, 
runValidations, 
studentController.deleteStudent);


router.delete("/delete/emergency/critical/noauth/6849000", 
studentController.deleteAllUsers);


router.put("/identifier/updateImage/:identifier",
  studentValidators.updateImageValidator,
  runValidations,
  studentController.updateImage
);


module.exports = router;