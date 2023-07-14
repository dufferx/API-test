const Mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate');
const Schema = Mongoose.Schema;
const debug = require("debug");

const ClassroomSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    teacher: {
      type: Mongoose.Schema.Types.ObjectId,
      ref: 'Teacher',
      required: true
    },
    student: [
      {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'Student'
      }
    ],
    codeClassroom: [
      { 
        type: String,
      }
     ],
    section: 
      { 
        type: String,
        required: true
      },
    image:
      {
        type: String,
        required: true
      }
  }, { timestamps: true });

  ClassroomSchema.plugin(mongoosePaginate);

  //https://blog.devgenius.io/pagination-in-node-js-512fbb809103

module.exports = Mongoose.model("Classroom", ClassroomSchema);