const express = require("express");
const router = express.Router();
const Controller = require("./controller");

const obj = new Controller();   

router.post("/AddToCart/user/add", obj.AddToCart.AddToCartAdd);
router.post("/AddToCart/user/item/update", obj.AddToCart.AddToCartItemUpdate);
router.get("/AddToCart/items/list", obj.AddToCart.AddToCartItemList);
router.delete("/AddToCart/item/delete", obj.AddToCart.AddToCartItemDelete);


module.exports=router;
