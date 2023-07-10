const express = require("express");
const router = express.Router();
const Controller = require("./controller");

const obj = new Controller();   

router.post("/AddToCart/user/add", obj.AddToCart.AddToCartAdd);

module.exports=router;
