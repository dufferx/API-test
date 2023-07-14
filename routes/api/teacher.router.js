const express = require("express");
const router = express.Router();

const teacherController = require("../../controllers/teacher.controller");

const teacherValidators = require("../../validators/teacher.validators");
const runValidations = require("../../validators/index.middleware");

router.get("/", teacherController.findAll);

router.get("/:identifier", teacherValidators.findTeacherByIdValidator,
runValidations, 
teacherController.findOneById);

router.post("/register/", 
teacherValidators.registerTeacherValidator,
runValidations,
teacherController.register);

router.post("/signin", teacherController.login);

router.put("/token/update/:token", 
teacherValidators.updateTeacherValidator, 
runValidations, 
teacherController.updateTeacher);

router.delete("/token/delete/:token", 
teacherValidators.deleteTeacherValidator, 
runValidations, 
teacherController.deleteTeacher);

router.get("/token/:token", 
teacherValidators.findTeacherByTokenValidator, 
runValidations, 
teacherController.findTeacherByToken);


router.put("/identifier/updateImage/:identifier",
  teacherValidators.updateImageValidator,
  runValidations,
  teacherController.updateImage
);


module.exports = router;