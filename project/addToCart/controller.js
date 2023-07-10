const AddToCartModel = require("../../models/addToCart");

const bcrypt = require("bcrypt");
const { json } = require("body-parser");
const { response } = require("express");
var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");

class AddToCartController {
    async AddToCartAdd (req,res)  {
        const { user, cartItems } = req.body;
      try{
    
        // check if user exits or not
        const isUserExist = await AddToCartModel.findOne({ user });
        console.log("user exists");
      
        // if exists then add the data
        if (isUserExist) {
          //   use $addToSet ,to prevent adding of duplicate items.and use findoneandupdate means that the useer already exists and we are adding item to its existing item cart
          const data = await AddToCartModel.findOneAndUpdate(
            { user },
            { $addToSet: { cartItems: cartItems } }
          );
          res.send({ success: true, data:data });
          res.send({message:"added too cart"});
        } else {
          //if user doesn't exists then create the cart for new user.
      
          const AddNewItems = new AddToCartModel({
            ...req.body,
          });
           const add = await AddNewItems.save();
           res.send({ success: true,data:add });
        }
    }catch(err){
        console.log(err);
    }
    };

}


class AddToCartControllers {
    constructor() {
      this.AddToCart = new AddToCartController();
      console.log("api failed");
    }
  }
  
  module.exports = AddToCartControllers;
  