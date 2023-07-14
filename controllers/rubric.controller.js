const Rubric = require("../models/Rubric.model");
const debug = require("debug")("app:rubric-controller");

const controller = {};

controller.create = async (req, res) => {
    try {
      const { guidelines } = req.body;
  
      const rubric = new Rubric({
        guidelines: guidelines
      });
  
      const newRubric = await rubric.save();
  
      if (!newRubric) {
        return res.status(409).json({ error: "Error creating rubric" });
      }
  
      return res.status(201).json(newRubric);
    } catch (error) {
      debug({ error });
      return res.status(500).json({ error: "Server Error" });
    }
};

controller.getOneById = async (req, res) => {
    try {
      const { identifier } = req.params;
  
      const rubric = await Rubric.findById(identifier);
  
      if (!rubric) {
        return res.status(404).json({ error: "Rubric not found" });
      }
  
      return res.status(200).json(rubric);
    } catch (error) {
      debug({ error });
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };
  
  module.exports = controller;