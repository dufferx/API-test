const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');
/*
//Procedemos a cambiar el modelo homework segun requerimientos de la app
const HomeworkSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    classroom: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'Classroom',
        required: true
    },
    rubric: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'Rubric',
    },
    students: [{
        studentId: {
            type: Mongoose.Schema.Types.ObjectId,
            ref: 'Student',
        },
        grade: {
            type: Number,
            default: 0
        }
    }]
}, {timestamps: true});*/

const StudentSchema = new Schema({
    studentId: {
      type: Mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: true
    },
    grade: {
      type: Number,
      required: true
    }
  });
  
  const HomeworkSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    classroom: {
      type: Mongoose.Schema.Types.ObjectId,
      ref: 'Classroom',
      required: true
    },
    rubric: {
      type: Mongoose.Schema.Types.ObjectId,
      ref: 'Rubric',
    },
    students: {
      type: [StudentSchema],
      default: []
    }
  }, { timestamps: true });

  HomeworkSchema.plugin(mongoosePaginate);

module.exports = Mongoose.model("Homework", HomeworkSchema);