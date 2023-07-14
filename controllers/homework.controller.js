const Homework = require("../models/Homework.model");
const Classroom = require("../models/Classroom.model");
const debug = require("debug")("app:homework-controller");

const controller = {};

controller.create = async (req, res) => {
    try{
        const {name, classroom, rubric} = req.body;

        const homework = new Homework({
            name: name,
            classroom: classroom,
            //rubric: rubric
        });

        const newHomework = await homework.save();

        if(!newHomework) {
            return res.status(409).json({ error: "Error creating homework" });
        }

        return res.status(201).json(newHomework);
    }catch (error) {
        debug({ error });
        return res.status(500).json({ error: "Server Error" });
    }
};
/*
controller.findByClassroomId = async (req, res) => {
    try {
        const { classroomId } = req.params;

        const homework = await Homework.find({classroom: classroomId});

        if(!homework){
            return res.status(404).json({ error: "Homework not found for the given classroom ID" });
        }

        return res.status(200).json(homework);
    } catch (error) {
        debug({ error });
        return res.status(500).json({ error: "Internal Server Error" });
    }
};*/

controller.findByClassroomId = async (req, res) => {
    try {
      let { limit = 10, offset = 0 } = req.query;
      limit = parseInt(limit);
      offset = parseInt(offset);
      const { classroomId } = req.params;
  
      const totalHomeworks = await Homework.countDocuments({ classroom: classroomId });
      const totalPages = Math.ceil(totalHomeworks / limit);
  
      const homeworks = await Homework.find({ classroom: classroomId })
        .skip(offset)
        .limit(limit);
  
      const nextOffset = offset + limit;
      const previousOffset = offset - limit >= 0 ? offset - limit : 0;
  
      const baseUrl = `${req.protocol}://${req.get("host")}${req.originalUrl.split("?")[0]}`;
      const nextUrl = nextOffset < totalHomeworks ? `${baseUrl}?limit=${limit}&offset=${nextOffset}` : null;
      const previousUrl = offset > 0 ? `${baseUrl}?limit=${limit}&offset=${previousOffset}` : null;
  
      return res.status(200).json({
        homeworks,
        next: nextUrl,
        previous: previousUrl,
      });
    } catch (error) {
      debug({ error });
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };
  
controller.updateByHomeworkId = async (req, res) => {
    try {
      const { homeworkId } = req.params;
      const { studentId, grade } = req.body;
  
      const homework = await Homework.findById(homeworkId);
  
      if (!homework) {
        return res.status(404).json({ error: "Homework not found" });
      }
  
      const newStudent = { studentId, grade };
      homework.students.push(newStudent);
  
      const updatedHomework = await homework.save();
  
      return res.status(200).json(updatedHomework);
    } catch (error) {
      debug({ error });
      return res.status(500).json({ error: "Internal server error" });
    }
  };
  /*
  controller.updateByHomeworkId = async (req, res) => {
    try {
      const { homeworkId } = req.params;
      const { studentId, grade } = req.body;
  
      const homework = await Homework.findById(homeworkId);
  
      if (!homework) {
        return res.status(404).json({ error: "Homework not found" });
      }
  
      // Verificar si ya existe un objeto con el mismo studentId
      const existingStudentIndex = homework.students.findIndex(
        (student) => student.studentId === studentId
      );
  
      if (existingStudentIndex !== -1) {
        // Si el studentId ya existe, modificar el objeto existente con el nuevo grade
        homework.students[existingStudentIndex].grade = grade;
      } else {
        // Si el studentId no existe, agregar un nuevo objeto al arreglo
        const newStudent = { studentId, grade };
        homework.students.push(newStudent);
      }
  
      const updatedHomework = await homework.save();
  
      return res.status(200).json(updatedHomework);
    } catch (error) {
      debug({ error });
      return res.status(500).json({ error: "Internal server error" });
    }
  };
  */
  

  controller.findGradeByStudentAndHomeworkId = async (req, res) => {
    try {
      const { studentId, homeworkId } = req.params;
  
      const homework = await Homework.findOne({
        _id: homeworkId,
        "students.studentId": studentId
      });
  
      if (!homework) {
        return res.status(404).json({ error: "Homework or student not found" });
      }
  
      const student = homework.students.find(
        (student) => student.studentId.toString() === studentId
      );
  
      return res.status(200).json({ grade: student.grade });
    } catch (error) {
      debug({ error });
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };
  


module.exports = controller;
