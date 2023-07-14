const express = require("express");
const router = express.Router();

const authController = require("../../controllers/auth.controller");
const authValidators = require("../../validators/auth.validators");
const runValidations = require("../../validators/index.middleware");

router.post("/both/signin", 
authValidators.signinValidator, 
runValidations,
authController.signIn);

router.get("/find/status/:token", 
authController.findOneByToken);

router.get("/find/alldata/user/:token",
authController.findOneByTokenAll);

router.put("/update/data/user/:id",
  authValidators.updateUserValidator,
  runValidations,
  authController.updateUser);

module.exports = router;
