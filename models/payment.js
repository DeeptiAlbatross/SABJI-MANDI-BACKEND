const mongoose = require("mongoose");

var ObjectId = mongoose.Schema.Types.ObjectId;


const PaymentSchema = new mongoose.Schema(
  {
    paymentId: String,
    amount: Number,
    orderId: String,
    method: String,
    amountRefunded: String,
    description: String,
    customerId: String,
    tokenId: String,
    // course: {
    //   type: ObjectId,
    //   ref: "Course",
    // },
    user: {
      type: ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const PaymentModel = mongoose.model("Payment", PaymentSchema);
module.exports = PaymentModel;