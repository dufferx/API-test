const Student = require("../models/Student.model");
const debug = require("debug")("app:student-controller");

const { createTokenstudent, verifyToken } = require ("../utils/jwt.tools");

const controller = {};

controller.register = async (req, res) => {
  try{
      
    function generarLetra(){
      var letras = ["Blonde_rasta.png","Bold_friendly.png","Dracula.png","Dreads_kid.png","Gasparin.png","Happy_braces.png","Happy_bun.png","Happy_Skull.png","Mummy.png","Orange_curly.png","Pumpkin.png","Purple_punk.png","Wavy_carrot.png","Wolf.png"];
      var letra = (Math.random()*13).toFixed(0);
      
      const baseUrl = `${req.protocol}://${req.get("host")}`;

      
      return baseUrl + "/" + letras[letra];
    }
    
  const {name, password, email, avatar, status} = req.body;

  const student = await Student.findOne( {email: email} );

  if(student) {
      return res.status(409).json({ error: "The student already exits" })
  }

  const newStudent = new Student({
      name: name,
      password: password,
      email: email,
      avatar: generarLetra(),
      status: status
  })

  await newStudent.save();

  return res.status(201).json({message: "User develop succesfull "});
  }catch (error){
      debug({ error  })
      return res.status(500).json({error: "Server Error"})
  }
}

controller.findAll = async (req, res) => {
    try {
        const students = await Student.find();
        return res.status(200).json({students});
    } catch (error){
      debug({ error })
      return res.status(500).json({ error: "Error internal server"})
    }
}

controller.findOneById = async (req, res) => {
    try {
     const { identifier } = req.params;

     const student = await Student.findById(identifier);

     if(!student){
        return res.status(404)
        .json({error: "Student not found"})
     }
     
     return res.status(200).json(student);
    }catch(error){
        debug({error});
        return res.status(500).jason({error: "Error internal server"})
    }
}

controller.findOneByToken = async (req, res) => {
    try {
      const { tokens } = req.params;
  
      const student = await Student.findOne({ tokens: tokens });
  
      if (!student) {
        return res.status(404).json({ error: "Student not found" });
      }
  
      return res.status(200).json(student);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  };
  
//combinar con teacher
controller.login = async (req, res) => {
    try{
        const { identifier, password } = req.body

        const student = await Student.findOne({ $or: [ {name: identifier}, { email: identifier } ] });

        if (!student) {
            return res.status(404).json({ error: "The student does(not) exits" });
        }

        if (!student.comparePassword(password)) {
            return res.status(401).json({ error: "password incorrect" });
        }

        const token = createTokenstudent(student._id);
        student.tokens = [token, ...student.tokens.filter(_token => verifyToken(_token)).splice(0,4)];

        await student.save()

    return res.status(200).json({ token: token });
    }catch(error){
    debug(error);
    return res.status(500).json({ error: "Sever error" })
    }
};

controller.upgradeStudent = async (req, res) => {
    try {
      const { token } = req.params;
      const { name, email } = req.body;
  
      const updatedStudent = await Student.findOneAndUpdate(
        { tokens: token },
        { name, email },
        { new: true }
      );
  
      if (!updatedStudent) {
        return res.status(404).json({ error: "Student not found" });
      }
  
      return res.status(200).json(updatedStudent);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  };

controller.deleteStudent = async (req, res) => {
    try {
      const { token } = req.params;
  
      const deletedStudent = await Student.findOneAndDelete({ tokens: token });
  
      if (!deletedStudent) {
        return res.status(404).json({ error: "Student not found" });
      }
  
      return res.status(200).json({ message: "Student deleted successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  };



controller.deleteAllUsers = async (req, res) => {
  try {
    await Student.deleteMany();
    return res.status(200).json({ message: "All users deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server Error" });
  }
};

controller.updateImage = async (req, res) => {
  try {
    const { identifier } = req.params;
    const { avatar } = req.body;

    const updatedStudent = await Student.findOneAndUpdate(
      { _id: identifier },
      { avatar },
      { new: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({ error: "Student not found" });
    }

    return res.status(200).json(updatedStudent);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};



module.exports = controller;

//1