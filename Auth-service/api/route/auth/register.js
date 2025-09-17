const router = require("express").Router();
const {register,login } = require("../../controller/auth/register");


const userValidator = require("../../validation/auth/register"); // Validation Schema
const  validate  = require("../../middleware/validate");

// router
//   .route("/register")
//   .post(verifyAccessToken, authorize(['Admin']) ,validate(userValidator.addEmployee), onBoarding);

router
  .route("/register")
  .post( validate(userValidator.registerSchema), register);

 router
  .route("/login")
  .post( validate(userValidator.loginSchema), login); 

  module.exports = router;
