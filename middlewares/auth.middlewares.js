const { verifyToken } = require("../utils/jwt.tools");
const debug = require("debug")("app:auth-middleware");

const Student = require("../models/Student.model")

const middlewares = {};

const tokenPrefix = "Bearer"

middlewares.authenticationStudent = async (req, res, next) => {
 try {
   const { authorization } = req.headers;

   if(!authorization) {
      return res.status(401).json({ error: "No autorizado" });
   }

   const [prefix, token] = authorization.split(" ");

   if(prefix != tokenPrefix) {
      return res.status(401).json({ error: "No autorizado"});
   }

   if(!token) {
      return res.status(401).json({ error: "No autorizaod"});
   }

   const tokenObject = verifyToken(token);

   if(!tokenObject) {
      return res.status(401).json({ error: "No autorizado"});
   }

   const { studentId } = tokenObject;

   const student = Student.findById(studentId);

   if(!student){
      return res.status(401).json({ error: "No autorizado" });
   }

   const isTokenValid = student.tokens.includes(token);
   if(!isTokenValid) {
      return res.status(401).json({ error: "No autorizado" });
   }

   req.student = student;
   req.token = token;

   next();
 } catch (error) {
    return res.status(500).json({ error: "Server error"})
 }
}

module.exports = middlewares