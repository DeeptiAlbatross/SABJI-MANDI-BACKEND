// const mongoose = require("mongoose");
// const RazorPay = require('razorpay');
// const PaymentModel = require("../../models/payment");


// var ObjectId = mongoose.Types.ObjectId;


// const razorpay = new Razorpay({
//     key_id: 'YOUR_KEY_ID',
//     key_secret: 'YOUR_KEY_SECRET',
//   });

// class PaymentController {
//   async createOrder(req,res) {
//     try {
//       const order = await razorpay.createOrder(req);
//       res.send({ success: true, order, message: "Order created successfully!" });
//       console.log("order created successfully");
//     } catch (err) {
//       res.send({ success: false, message: "Order creation failed!" });
//       console.log("order creatiod successfully");


//     }
//   }

//   async verifyOrder(req,res) {
//     try {
//       const order = await razorPay.verifyOrder(req);
//       if (order) {
//         res.send({ success: true, message: "Payment has been verified" });
//       } else {
//         res.send({ success: false, message: "Payment verification failed" });
//       }
//     } catch (err) {
//         res.send({ success: false, message: "Error" });
    
//     }
//   }

//   async addPayment(req, res) {
//     try {
//       const order = await razorPay.verifyOrder(req);
//       if (!order) {
//         return res.send({ success: true, message: "Payment verification failed" });
//       }

//       const isAlreadyExist = await CourseModel.findOne({ _id: req.body.course, users: { $in: [req.user._id] } }).lean();
//       if (isAlreadyExist) {
//         return res.send({ success: true, message: "Course already purchased" });
//       }

//       const newPayment = new PaymentModel({
//         amount: req.body.amount,
//         method: req.body.method,
//         description: req.body.description,
//         course: ObjectId(req.body.course),
//         user: ObjectId(req.user._id),
//       });

//       await newPayment.save();

//       const newCourseUser = new CourseUserModel({
//         user: ObjectId(req.user._id),
//         course: ObjectId(req.body.course),
//         totalLiamInterviews: 5,
//         totalLiveInterviews: 5,
//       });

//       await newCourseUser.save();
//       await CourseModel.findOneAndUpdate({ _id: ObjectId(req.body.course) }, { $addToSet: { users: req.user._id } });

//       res.send({ success: true, message: "Payment made successfully" });
//     } catch (err) {
//       return helperFunction.sendErrorResponse(req, res, err);
//     }
//   }

// //   api to fetch the payment details
//   async paymentDetail(req, res) {
//     try {
//       const { id } = req.params;
//       let studyPlan = await PaymentModel.findOne({ _id: id }).populate("course").lean();
//       res.send({ success: true, data: studyPlan });
//     } catch (err) {
//       return helperFunction.sendErrorResponse(req, res, err);
//     }
//   }
// }

// class PaymentControllers {
//     constructor() {
//       this.payment = new PaymentController();
//       console.log("api failed");
//     }
//   }
  
//   module.exports = PaymentControllers;
