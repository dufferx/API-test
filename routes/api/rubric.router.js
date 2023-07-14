const express = require("express");
const router = express.Router();

const rubricController = require("../../controllers/rubric.controller");

const rubricValidators = require("../../validators/rubric.validators");
const runValidations = require("../../validators/index.middleware");

router.get(
    "/:identifier",
    rubricValidators.getRubricByIdValidator,
    runValidations,
    rubricController.getOneById
  );
  
router.post(
  "/",
  rubricValidators.createRubricValidator,
  runValidations,
  rubricController.create
);



module.exports = router;
