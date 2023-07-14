const Teacher = require("../models/Teacher.model");
const debug = require("debug")("app:teacher-controller");

const { createTokensteacher, verifyToken } = require("../utils/jwt.tools");

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

    const teacher = await Teacher.findOne({email: email});

    if(teacher) {
        return res.status(409).json({ error: "The teacher already exits" })
    }

    const newTeacher = new Teacher({
        name: name,
        password: password,
        email: email,
        avatar: generarLetra(),
        status: status
    })

    await newTeacher.save();

    return res.status(201).json({message: "Teacher develop succesfull"});
    }catch (error){
        debug({ error  })
        return res.status(500).json({error: "Server Error"})
    }
}

controller.findAll = async (req, res) => {
    try {
        const teachers = await Teacher.find();
        return res.status(200).json({teachers});
    } catch (error){
      debug({ error })
      return res.status(500).json({ error: "Error internal server"})
    }
}

controller.findOneById = async (req, res) => {
    try {
     const { identifier } = req.params;

     const teacher = await Teacher.findById(identifier);

     if(!teacher){
        return res.status(404)
        .json({error: "Teacher not found"})
     }
     
     return res.status(200).json(teacher);
    }catch(error){
        debug({error});
        return res.status(500).jason({error: "Error internal server"})
    }
}

controller.login = async (req, res) => {
    try{
        const { identifier, password } = req.body

        const teacher = await Teacher.findOne( { email: identifier } );

        if (!teacher) {
            return res.status(404).json({ error: "The teacher does(not) exits" });
        }

        if (!teacher.comparePassword(password)) {
            return res.status(401).json({ error: "password incorrect" });
        }

        const token = createTokensteacher(teacher._id);
        teacher.tokens =  [token, ...teacher.tokens.filter(_token => verifyToken(_token)).splice(0,4)];

        await teacher.save()

        return res.status(200).json({ token: token });
    }catch(error){
    debug(error);
    return res.status(500).json({ error: "Sever error" })
    }
};

controller.updateTeacher = async (req, res) => {
    try {
      const { token } = req.params;
      const { name, email } = req.body;
  
      const updatedTeacher = await Teacher.findOneAndUpdate(
        { tokens: token },
        { $set: { name, email } },
        { new: true }
      );
  
      if (!updatedTeacher) {
        return res.status(404).json({ error: "Teacher not found" });
      }
  
      return res.status(200).json(updatedTeacher);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
};
  
controller.deleteTeacher = async (req, res) => {
    try {
      const { token } = req.params;
  
      const deletedTeacher = await Teacher.findOneAndDelete({ tokens: token });
  
      if (!deletedTeacher) {
        return res.status(404).json({ error: "Teacher not found" });
      }
  
      return res.status(200).json({ message: "Teacher deleted successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
};

controller.findTeacherByToken = async (req, res) => {
    try {
      const { token } = req.params;
  
      const teacher = await Teacher.findOne({ tokens: token });
  
      if (!teacher) {
        return res.status(404).json({ error: "Teacher not found" });
      }
  
      return res.status(200).json(teacher);
    } catch (error) {
      debug({ error });
      return res.status(500).json({ error: "Internal server error" });
    }
  };
  
  controller.updateImage = async (req, res) => {
    try {
      const { identifier } = req.params;
      const { avatar } = req.body;
  
      const updatedTeacher = await Teacher.findOneAndUpdate(
        { _id: identifier },
        { avatar },
        { new: true }
      );
  
      if (!updatedTeacher) {
        return res.status(404).json({ error: "Teacher not found" });
      }
  
      return res.status(200).json(updatedTeacher);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  };

module.exports = controller;