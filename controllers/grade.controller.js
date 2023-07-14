const Grade = require("../models/Grade.model");
const debug = require("debug")("app:grade-controller");

const controller = {};

controller.create = async (req, res) => {
    try {
      const { student, guidelines, homework } = req.body;
  
      const grade = new Grade({
        student: student,
        guidelines: guidelines,
        homework: homework
      });
  
      const newGrade = await grade.save();
  
      if (!newGrade) {
        return res.status(409).json({ error: "Error creating grade" });
      }
  
      return res.status(201).json(newGrade);
    } catch (error) {
      debug({ error });
      return res.status(500).json({ error: "Server Error" });
    }
  };
  
  controller.findAll = async (req, res) => {
    try {
      const grades = await Grade.find();
      return res.status(200).json({ grades });
    } catch (error) {
      debug({ error });
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };
  
  
  controller.findByStudentAndGuidelineId = async (req, res) => {
    try {
      const { studentId, guidelineId } = req.params;
  
      const grade = await Grade.findOne({
        student: studentId,
        "guidelines.guideline": guidelineId
      });
  
      if (!grade) {
        return res.status(404).json({ error: "Grade not found for the given student and guideline IDs" });
      }
  
      return res.status(200).json(grade);
    } catch (error) {
      debug({ error });
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };
  
  module.exports = controller;