var CategoryRoute = require("./project/category/routing");
var AuthenticationRoute = require("./project/authentication/routing");
var AddToCartRoute = require("./project/addToCart/routing");


module.exports = function (app) {
  app.use("/api", CategoryRoute);
  app.use("/api",AuthenticationRoute);
  app.use("api",AddToCartRoute);
}
