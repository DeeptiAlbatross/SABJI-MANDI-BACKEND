const express = require("express");
const router = express.Router();
const Controller = require("./controller");

const obj = new Controller();
router.post("/authentication/add/user", obj.authentication.authenticationUserData);
router.post("/authentication/user/signUp", obj.authentication.authenticationSignUp);
router.post("/authentication/user/signIn", obj.authentication.authenticationSignIn);



module.exports=router;