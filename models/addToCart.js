const mongoose = require("mongoose");

// Define the schema for the cart item
const CartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  products: [
    {
      itemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CategoryItems",
      },
      quantity: String,
    },
  ],
});

const Cart = mongoose.model("Cart", CartSchema);
module.exports = Cart;
