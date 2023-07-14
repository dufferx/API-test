const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const GradeSchema = new Schema({
    _id: {
      type: Mongoose.Schema.Types.ObjectId,
      auto: true
    },
    student: {
      type: Mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true
    },
    guidelines: [
      {
        guideline: {
          type: Mongoose.Schema.Types.ObjectId,
          ref: "Rubric",
          required: true
        },
        grade: {
          type: Number,
          required: true
        }
      }
    ],
    homework: {
      type: Mongoose.Schema.Types.ObjectId,
      ref: "Homework",
      required: true
    }
  }, { timestamps: true });
  
  module.exports = Mongoose.model("Grade", GradeSchema);