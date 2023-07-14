const express = require("express");
const router = express.Router();

const multer  = require('multer');
const storage = multer.diskStorage({
  destination: './public',
  filename: function(req,file,cb) {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage });

const classroomController = require("../../controllers/classroom.controller");

const classroomValidators = require("../../validators/classroom.validators");
const runValidations = require("../../validators/index.middleware");

const { authentication } = require("../../middlewares/auth.middlewares");
const controller = require("../../controllers/classroom.controller");

router.get("/", classroomController.findAll);

router.get("/:identifier", classroomValidators.findClassroomByIdValidator,
runValidations, 
classroomController.findOneById);

router.get("/found/:teacherId", classroomValidators.findClassroomByTeacherIdValidator,
runValidations, 
classroomController.findByTeacherId);

router.post("/",
classroomValidators.createClassroomValidator,
runValidations,
classroomController.create);

router.delete("/delete/:identifier", classroomValidators.deleteClassroomByIdentifierValidator, runValidations, classroomController.deleteClassroomByIdentifier);

router.get("/students/classrooms/:studentId", classroomValidators.findClassroomsByStudentIdValidator, runValidations, classroomController.findAllByStudentId);

router.get("/students/classrooms/plusname/teacher/:id", classroomValidators.findClassroomsByStudentIdValidator, runValidations, classroomController.findAllByStudentOrTeacherIdWithTeacherName);

//router.get("/students/classrooms/teacher/:teacherId", classroomValidators.findClassroomsByTeacherIdValidator, runValidations, classroomController.findAllByStudentIdWithStudentName)

router.put("/teacher/update/:classroomId", classroomController.updateByClassroomId);

router.post("/add-student/code/classroom",
  classroomValidators.addStudentToClassroomValidator,
  runValidations,
  classroomController.addStudentToClassroom
);

router.post('/upload', upload.single('image'),(req,res) =>{
  const baseUrl = `${req.protocol}://${req.get("host")}`

  if(!req.file){
      return res.status(400).json({ message: "No se ha enviado ninguna imagen. "});
  }

  const imagePath = `${baseUrl}/${req.file.filename}`;

  res.json({ message: "Imagen subida existosamente.", imagePath});

})


module.exports = router;