const express = require("express");
const router = express.Router();

//Importing all the enrouters
const studentRouter = require("./student.router");
const teacherRouter = require("./teacher.router");
const classroomRouter = require("./classroom.router");
const homeworkRouter = require("./homework.router");
const rubricRouter = require("./rubric.router");
const gradeRouter = require("./grade.router");
const authRouter = require("./auth.router");

//Defining the routes
router.use("/auth", authRouter);
router.use("/student", studentRouter);
router.use("/teacher", teacherRouter);
router.use("/classroom", classroomRouter);
router.use("/homework",homeworkRouter);
router.use("/rubric",rubricRouter);
router.use("/grade", gradeRouter);
router.use("/auth", authRouter);

module.exports = router;



