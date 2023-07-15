var CategoryRoute = require("./project/category/routing");
var AuthenticationRoute = require("./project/authentication/routing");
var AddToCartRoute = require("./project/addToCart/routing");
var S3Route=require("./project/s3/routing");
// var PaymentRoute=require("./project/payment/routing");
var ProfileRoute=require("./project/profile/routing");

module.exports = function (app) {
  app.use("/api", CategoryRoute);
  app.use("/api",AuthenticationRoute);
  app.use("/api",AddToCartRoute);
  app.use("/api",S3Route);
  // app.use("/api",PaymentRoute);
  app.use("/api",ProfileRoute);
}