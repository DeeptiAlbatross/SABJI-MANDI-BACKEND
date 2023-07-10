const AddToCartModel = require("../../models/addToCart");
const { json } = require("body-parser");
const { response } = require("express");
var express = require("express");
var router = express.Router();

class AddToCartController {
   async AddToCartAdd(req, res) {
    const { userId,productId,quantity,price } = req.body;
  
    try {
      let cart = await AddToCartModel.findOne({ userId });
  
      if (cart) {
        //cart exists for user
        let itemIndex = cart.products.findIndex(p => p.productId == productId);
  
        if (itemIndex > -1) {
          //product exists in the cart, update the quantity
          let productItem = cart.products[itemIndex];
          productItem.quantity = quantity;
          cart.products[itemIndex] = productItem;
        } else {
          //product does not exists in cart, add new item
          cart.products.push({ productId, quantity,price });
        }
        newCart = await cart.save();
        return res.status(201).send(newCart);
      } else {
        //no cart for user, create new cart
        const newCart = await AddToCartModel.create({
          userId,
          products: [{ productId, quantity, price }]
        });
  
        return res.status(201).send(newCart);
      }
    } catch (err) {
      console.log(err);
      res.status(500).send("Something went wrong");
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
  