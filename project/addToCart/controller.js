const AddToCartModel = require("../../models/addToCart");
const { json } = require("body-parser");
const { response } = require("express");
var express = require("express");
var router = express.Router();

class AddToCartController {
  // Api to add the items to user's cart

  async AddToCartAdd(req, res) {
    const { userId, itemId, quantity } = req.body;

    // check if user exits or not
    const isUserExist = await AddToCartModel.findOne({ userId });
    console.log("user exists", isUserExist);

    // if exists then add the data
    if (isUserExist) {
      //   use $addToSet ,to prevent adding of duplicate items.and use findoneandupdate means that the useer already exists and we are adding item to its existing item cart
      const data = await AddToCartModel.findOneAndUpdate(
        { userId },
        { $addToSet: { products: { itemId, quantity } } }
      );
      console.log("data", data);
      res.send({ message: "success", data: data });
    } else {
      //if user doesn't exists then create the cart for new user.

      const AddNewItems = new AddToCartModel({
        userId,
        products: [{ itemId, quantity }],
      });
      const saves = await AddNewItems.save();
      res.send({ success: true, data: saves });
    }
  }

  // api to update the quantity and the price of the itemm.
  async AddToCartItemUpdate(req, res) {
    const { quantity, price, userId } = req.body;
    let OB = {};
    if (quantity) OB.quantity = quantity;
    if (price) OB.price = price;

    try {
      // Find the user's cart and update the item quantity
      const updatedCart = await AddToCartModel.findOneAndUpdate({ userId }, OB);

      if (!updatedCart) {
        return res.status(404).json({ message: "Cart or item not found" });
      }

      res.json({
        message: "Item quantity updated successfully",
        cart: updatedCart,
      });
    } catch (error) {
      console.error("An error occurred while updating item quantity:", error);
      res.status(500).json({ message: "Failed to update item quantity" });
    }
  }

  // Api to get the details of the cart items.
  async AddToCartItemList(req, res) {
    try {
      const find = await AddToCartModel.find().populate("products.itemId");
      res.send({ success: true, data: find });
      console.log("console");

    } catch (error) {
      console.log("error", error);
      res.send(error);
      console.log("CONSOLE");
    }
  }

  // Api to delete the specific item from the cart.
  async AddToCartItemDelete(req, res) {
    try {
      const { userId, itemId } = req.body;
      const update = await AddToCartModel.updateOne(
        { userId },
        { $pull: { products: itemId } }
      );
      res.send({ success: true, data: update });
      console.log("Kuch to hua");
    } catch (err) {
      console.log("Cannot delete item", err);
      res.send(err);
    }
  }
}

class AddToCartControllers {
  constructor() {
    this.AddToCart = new AddToCartController();
    console.log("api failed");
  }
}

module.exports = AddToCartControllers;
