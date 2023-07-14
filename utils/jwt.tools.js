const jwt = require("jsonwebtoken");

const secret = process.env.TOKEN_SECRET || "SuperScret";
const expTime = process.env.TOKEN_EXP || "15m";

const tools = {};

tools.createTokenstudent = (_id) => {
    return jwt.sign({ studentId: _id }, secret, { expiresIn: expTime});
}

tools.createTokensteacher = (_id) => {
    return jwt.sign({ teacher: _id}, secret, { expiresIn: expTime});
}

tools.verifyToken = (token) => {
 try {
   return jwt.verify(token, secret);
 } catch {
   return false;
 }
}

module.exports = tools;