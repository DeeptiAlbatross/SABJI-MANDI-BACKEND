const express = require("express");
const router = express.Router();

const Controller = require("./controller");
const obj = new Controller();
router.get("/category/list", obj.category.categoryList);
router.post("/category/add", obj.category.categoryAdd);
router.post("/category/update", obj.category.categoryupdate);
router.delete("/category/delete", obj.category.categoryDelete);
router.post("/category/item/add", obj.category.categoryItemAdd);
router.get("/category/item/fetch", obj.category.categoryItemFetch);
router.get("/category/item/details", obj.category.categoryItemDetails);



module.exports = router;
