const CategoryModel = require("../../models/category");
const CategoryItemModel = require("../../models/categoryItems");

// Api to show the categories.
class CategoryController {
  async categoryList(req, res) {
    try {
      const categories = await CategoryModel.find();
      res.send({ success: true, data: categories });
    } catch {
      (error) => {
        res.send({ success: false, error });
      };
    }
  }

  // Api to add the category data into our database
  async categoryAdd(req, res) {
    const { categoryName, image } = req.body;
    try {
      const newCategory = new CategoryModel({
        categoryName,
        image,
      });

      await newCategory.save();
      res.send({ success: true });
    } catch {
      (error) => {
        res.send({ success: false, error });
      };
    }
  }

  // api to update the category.
  async categoryupdate(req, res, next) {
    try {
      const { id, categoryName } = req.body;
      console.log("ID", id, categoryName);
      const updated = await CategoryModel.findOneAndUpdate(
        { _id: id },
        { categoryName }
      );
      res.send({ success: true, data: updated });

      then((updatedCategory) => {
        console.log("updated Category", updatedCategory);
        res.send(updatedCategory);
      });
    } catch (err) {
      console.log("ERROR", err);
      res.send(err);
    }
  }

  // Api to delete the category
  async categoryDelete(req, res, next) {
    try {
      const { id } = req.body;
      console.log("ID", id, categoryName);
      const deleted = await CategoryModel.findOneAndRemove(
        { _id: id },
        { categoryName }
      );
      res.send({ success: true, data: deleted });

      then((deletedCategory) => {
        console.log("deletedCategory", deletedCategory);
        res.send(deletedCategory);
      });
    } catch (err) {
      console.log("ERROR", err);
      res.send(err);
    }
  }

  // Api to add the item in the category.
  async categoryItemAdd(req, res, next) {
    const { name, image, price, quantity, category } = req.body;
    try {
      const AddCategoryItem = new CategoryItemModel({
        name,
        image,
        price,
        quantity,
        category,
      });

      const saved = await AddCategoryItem.save();
      res.send({ success: true, data: saved });
    } catch (err) {
      res.send(err);
    }
  }

  // Api to fetch the details of the category and items together.
  async categoryItemFetch(req, res) {
    try {
      let items = await CategoryItemModel.find().populate("category");
      res.send({ success: true, data: items });
    } catch (err) {
      res.send({ success: false, error: err });
      console.log("data items nhi h");
    }
  }

  // Api to give the details of the item
  async categoryItemDetails(req, res, next) {
    const { id } = req.params;
   try{

    const savedDetails = await CategoryItemModel.findOne({ _id: id }).populate(
      "category");
    res.send({ success: true, data: savedDetails ,message :"Data item details"});
  } catch(error) {
    res.send(error);
  }
}
}

class CategoryControllers {
  constructor() {
    this.category = new CategoryController();
    console.log("api failed");
  }
}

module.exports = CategoryControllers;
