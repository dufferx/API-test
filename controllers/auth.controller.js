const Student = require("../models/Student.model");
const Teacher = require("../models/Teacher.model");
const debug = require("debug")("app:auth-controller");
const { createTokenstudent, createTokensteacher, verifyToken } = require("../utils/jwt.tools");

const authController = {};

authController.signIn = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    // Buscar el token
    const student = await Student.findOne({ $or: [{ name: identifier }, { email: identifier }] });
    const teacher = await Teacher.findOne({ $or: [{ name: identifier }, { email: identifier }] });

    // Verifica usuario y contra
    let user = null;
    let isStudent = false;

    if (student) {
      user = student;
      isStudent = true;
    } else if (teacher) {
      user = teacher;
    }

    if (!user) {
      return res.status(404).json({ error: "The user does not exist" });
    }

    if (!user.comparePassword(password)) {
      return res.status(401).json({ error: "Incorrect password" });
    }

    // Aqui se genera el token
    let token = "";
    if (isStudent) {
      token = createTokenstudent(user._id);
    } else {
      token = createTokensteacher(user._id);
    }

    // Y aqui se le asigna
    user.tokens = [token, ...user.tokens.filter((_token) => verifyToken(_token)).splice(0, 4)];
    await user.save();

    return res.status(200).json({ token });
  } catch (error) {
    debug(error);
    return res.status(500).json({ error: "Server error" });
  }
};



authController.findOneByToken = async (req, res) => {
  try {
    const { token } = req.params;

    // Find student by token
    const student = await Student.findOne({ tokens: token }).select("status");
    if (student) {
      return res.status(200).json({ status: student.status });
    }

    // Find teacher by token
    const teacher = await Teacher.findOne({ tokens: token }).select("status");
    if (teacher) {
      return res.status(200).json({ status: teacher.status });
    }

    // If neither student nor teacher is found with the given token
    return res.status(404).json({ message: "Can(not) found user with the providen token." });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

authController.findOneByTokenAll = async (req, res) => {
  try {
    const { token } = req.params;

    // Find student by token and select specific fields
    const student = await Student.findOne({ tokens: token }).select("name email status avatar");
    if (student) {
      return res.status(200).json({ user: student });
    }

    // Find teacher by token
    const teacher = await Teacher.findOne({ tokens: token }).select("name email status avatar");
    if (teacher) {
      return res.status(200).json({ user: teacher });
    }

    // If neither student nor teacher is found with the given token
    return res.status(404).json({ message: "Can(not) find user with the provided token." });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

authController.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    const student = await Student.findByIdAndUpdate(id, { name, email }, { new: true });
    if (student) {
      return res.status(200).json({ user: student });
    }

    const teacher = await Teacher.findByIdAndUpdate(id, { name, email }, { new: true });
    if (teacher) {
      return res.status(200).json({ user: teacher });
    }

    return res.status(404).json({ message: "User not found" });
  } catch (error) {
    debug(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

//1
module.exports = authController;
