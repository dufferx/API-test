const Classroom = require("../models/Classroom.model");
const Teacher = require("../models/Teacher.model");
const Functions = require("../utils/functions.tools");
const debug = require("debug")("app:classroom-controller");


const controller = {};



controller.create = async (req, res) => {
  try {

    function generarLetra(){
      var letras = ["A","B","C","D","E","F","H","I","J","K","0","1","2","3","4","5","6","7","8","9"];
      var numero = (Math.random()*15).toFixed(0);
      return letras[numero];
    }
    
    function colorHEX(){
      var color = "";
      for(var i=0;i<6;i++){
        color = color + generarLetra() ;
      }
      return color;
    }

    const { name, teacher, student, codeClassroom, image, section  } = req.body;

    const classroom = new Classroom({
      name: name,
      teacher: teacher,
      student: student,
      image: image,
      section: section,
      codeClassroom: colorHEX()
    });
    
  
    const newClassroom = await classroom.save();

    if (!newClassroom) {
      return res.status(409).json({ error: "Error creating classroom" });
    }

    //return res.status(201).json(newClassroom);
    return res.status(201).json({message: "Classroom develop succesfull "});
  } catch (error) {
    debug({ error });
    return res.status(500).json({ error: "Server Error" });
  }
};
/*
controller.findAll = async (req, res) => {
  try {
    const classrooms = await Classroom.find();
    return res.status(200).json({classrooms});
  } catch (error) {
    debug({ error });
    return res.status(500).json({ error: "Internal Server Error" });
  }
};*/



controller.findAll = async (req, res) => {
  try {
    let { page = 1, limit = 10 } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);

    const classrooms = await Classroom.find()
      .skip((page - 1) * limit)
      .limit(limit);

    return res.status(200).json({ classrooms });
  } catch (error) {
    debug({ error });
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

controller.findOneById = async (req, res) => {
  try {
    const { identifier } = req.params;

    const classroom = await Classroom.findById(identifier);

    if (!classroom) {
      return res.status(404).json({ error: "Classroom not found" });
    }

    return res.status(200).json(classroom);
  } catch (error) {
    debug({ error });
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

controller.findByTeacherId = async (req, res) => {
  try {
    const { teacherId } = req.params

    const classroom = await Classroom.find({ teacher: teacherId });

    if (!classroom) {
      return res.status(404).json({ error: "Classroom not found for the given teacher ID" });
    }

    return res.status(200).json(classroom);
  } catch (error) {
    debug({ error });
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

controller.deleteClassroomByIdentifier = async (req, res) => {
  try {
    const { identifier } = req.params;

    const classroom = await Classroom.findByIdAndDelete(identifier);

    if (!classroom) {
      return res.status(404).json({ error: "Classroom not found" });
    }

    return res.status(200).json({ message: "Classroom deleted successfully" });
  } catch (error) {
    debug({ error });
    return res.status(500).json({ error: "Internal server error" });
  }
};

controller.findAllByStudentId = async (req, res) => {
  try {
    const { studentId } = req.params;
    const classrooms = await Classroom.find({ student: studentId });

    if (classrooms.length === 0) {
      return res.status(404).json({ error: "Classroom not found for the given student ID" });
    }

    return res.status(200).json({ classrooms });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
/*
controller.findAllByStudentIdWithTeacherName = async (req, res) => {
  try {
    const { studentId } = req.params;

    const classrooms = await Classroom.find({ student: studentId }).populate("teacher", "name");

    if (classrooms.length === 0) {
      return res.status(404).json({ error: "Classroom not found for the given student ID" });
    }

    return res.status(200).json({ classrooms });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};*/
/*
controller.findAllByStudentIdWithTeacherName = async (req, res) => {
  try {
    let { page = 1, limit = 10, offset = 0 } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);
    offset = parseInt(offset);
    const { studentId } = req.params;

    const classrooms = await Classroom.find({ student: studentId })
      .skip((page - 1) * limit + offset)
      .limit(limit)
      .populate("teacher", "name");

    return res.status(200).json({ classrooms });
  } catch (error) {
    debug({ error });
    return res.status(500).json({ error: "Internal Server Error" });
  }
};*/
/*
controller.findAllByStudentIdWithTeacherName = async (req, res) => {
  try {
    let { page = 1, limit = 10 } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);
    const { studentId } = req.params;

    const totalClassrooms = await Classroom.countDocuments({ student: studentId });
    const totalPages = Math.ceil(totalClassrooms / limit);
    const nextPage = page < totalPages ? page + 1 : null;
    const previousPage = page > 1 ? page - 1 : null;

    const classrooms = await Classroom.find({ student: studentId })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate("teacher", "name");

    return res.status(200).json({
      classrooms,
      count: classrooms.length,
      totalPages,
      currentPage: page,
      nextPage,
      previousPage,
    });
  } catch (error) {
    debug({ error });
    return res.status(500).json({ error: "Internal Server Error" });
  }
};*/
/*
controller.findAllByStudentIdWithTeacherName = async (req, res) => {
  try {
    let { page = 1, limit = 10 } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);
    const { studentId } = req.params;

    const totalClassrooms = await Classroom.countDocuments({ student: studentId });
    const totalPages = Math.ceil(totalClassrooms / limit);

    const classrooms = await Classroom.find({ student: studentId })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate("teacher", "name");

    const nextPage = page < totalPages ? page + 1 : null;
    const previousPage = page > 1 ? page - 1 : null;

    const baseUrl = `${req.protocol}://${req.get("host")}${req.originalUrl.split("?")[0]}`;
    const nextUrl = nextPage ? `${baseUrl}?page=${nextPage}&limit=${limit}` : null;
    const previousUrl = previousPage ? `${baseUrl}?page=${previousPage}&limit=${limit}` : null;

    return res.status(200).json({
      classrooms,
      next: nextUrl,
      previous: previousUrl,
    });
  } catch (error) {
    debug({ error });
    return res.status(500).json({ error: "Internal Server Error" });
  }
};*/
/*controller.findAllByStudentIdWithTeacherName = async (req, res) => {
  try {
    let { limit = 10, offset = 0 } = req.query;
    limit = parseInt(limit);
    offset = parseInt(offset);
    const { studentId } = req.params;

    const totalClassrooms = await Classroom.countDocuments({ student: studentId });
    const totalPages = Math.ceil(totalClassrooms / limit);

    const classrooms = await Classroom.find({ student: studentId })
      .skip(offset)
      .limit(limit)
      .populate("teacher", "name");

    const nextOffset = offset + limit;
    const previousOffset = offset - limit >= 0 ? offset - limit : 0;

    const baseUrl = `${req.protocol}://${req.get("host")}${req.originalUrl.split("?")[0]}`;
    const nextUrl = nextOffset < totalClassrooms ? `${baseUrl}?limit=${limit}&offset=${nextOffset}` : null;
    const previousUrl = offset > 0 ? `${baseUrl}?limit=${limit-offset}&offset=${previousOffset}` : null;

    return res.status(200).json({
      classrooms,
      next: nextUrl,
      previous: previousUrl,
    });
  } catch (error) {
    debug({ error });
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

controller.findAllByStudentIdWithStudentName = async (req, res) => {
  try {
    let { limit = 10, offset = 0 } = req.query;
    limit = parseInt(limit);
    offset = parseInt(offset);
    const { teacherId } = req.params;

    const totalClassrooms = await Classroom.countDocuments({ teacher: teacherId });
    const totalPages = Math.ceil(totalClassrooms / limit);

    const classrooms = await Classroom.find({ teacher: teacherId })
      .skip(offset)
      .limit(limit)

    const nextOffset = offset + limit;
    const previousOffset = offset - limit >= 0 ? offset - limit : 0;

    const baseUrl = `${req.protocol}://${req.get("host")}${req.originalUrl.split("?")[0]}`;
    const nextUrl = nextOffset < totalClassrooms ? `${baseUrl}?limit=${limit}&offset=${nextOffset}` : null;
    const previousUrl = offset > 0 ? `${baseUrl}?limit=${limit-offset}&offset=${previousOffset}` : null;

    return res.status(200).json({
      classrooms,
      next: nextUrl,
      previous: previousUrl,
    });
  } catch (error) {
    debug({ error });
    return res.status(500).json({ error: "Internal Server Error" });
  }
};*/

controller.findAllByStudentOrTeacherIdWithTeacherName = async (req, res) => {
  try {
    let { limit = 10, offset = 0 } = req.query;
    limit = parseInt(limit);
    offset = parseInt(offset);
    const { id } = req.params;

    const totalClassrooms = await Classroom.countDocuments({
      $or: [{ student: id }, { teacher: id }],
    });
    const totalPages = Math.ceil(totalClassrooms / limit);

    const classrooms = await Classroom.find({
      $or: [{ student: id }, { teacher: id }],
    })
      .skip(offset)
      .limit(limit)
      .populate("teacher", "name");

    const nextOffset = offset + limit;
    const previousOffset = offset - limit >= 0 ? offset - limit : 0;

    const baseUrl = `${req.protocol}://${req.get("host")}${req.originalUrl.split("?")[0]}`;
    const nextUrl = nextOffset < totalClassrooms ? `${baseUrl}?limit=${limit}&offset=${nextOffset}` : null;
    const previousUrl = offset > 0 ? `${baseUrl}?limit=${limit-offset}&offset=${previousOffset}` : null;

    return res.status(200).json({
      classrooms,
      next: nextUrl,
      previous: previousUrl,
    });
  } catch (error) {
    debug({ error });
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

controller.updateByClassroomId = async (req, res) => {
  try {
    const { classroomId } = req.params;
    const { studentId } = req.body;

    const classroom = await Classroom.findById(classroomId);

    if (!classroom) {
      return res.status(404).json({ error: "Classroom not found" });
    }

    classroom.student.push(studentId);

    const updatedClassroom = await classroom.save();

    return res.status(200).json(updatedClassroom);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

controller.addStudentToClassroom = async (req, res) => {
  try {
    const { studentId, codeClassroom } = req.body;

    const classroom = await Classroom.findOne({ codeClassroom });
    if (!classroom) {
      return res.status(404).json({ error: "Classroom not found."});
    }

    const existingStudent = classroom.student.find((student) =>
      student._id.equals(studentId)
    );
    if (existingStudent) {
      return res.status(400).json({ error: "Student already exists in classroom." });
    }

    classroom.student.push(studentId);
    await classroom.save();

    return res.status(200).json({ message: "Student added to classroom successfully." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

module.exports = controller;
