const express = require("express");
const router = express.Router();


const Controller = require("./controller");
const obj = new Controller();

router.post("/profile/Update", obj.profile.profileUpdate);
// router.post("/profile/password/change", obj.profile.passwordChange);
router.post("/profile/password/update", obj.profile.UpdatePassword);



module.exports=router;
