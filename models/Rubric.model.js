const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const RubricSchema = new Schema({
    guidelines: [
        {
          _id: {
            type: Mongoose.Schema.Types.ObjectId,
            auto: true
          },
          name: {
            type: String,
            required: true
          },
          percentage: {
            type: Number,
            required: true
          }
        }
      ]
}, { timestamps: true })

module.exports = Mongoose.model("Rubric", RubricSchema);