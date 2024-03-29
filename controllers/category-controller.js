const router = require("express").Router();
const Category = require("../db").import("../models/category");
const Title = require("../db").import("../models/title");
const { Op } = require("sequelize");
const validateSession = require("../middleware/validate-session");
const validateAdmin = require("../middleware/validate-admin");

/******************************
 ***** Get Category List *********
 ******************************/
// * Returns all categories active or not
router.get("/list", (req, res) => {

  const query = {/*where: {
        active: {[Op.eq]: true}
    // }, include: {all: true, nested: true}, order: [["sortID", "ASC"]]};
    },*/ order: [["sortID", "ASC"]]
  };
  // }, include: [
  //     {model: Title,
  //         where: {
  //             active: {[Op.eq]: true}
  //         }
  //     }
  // ], 
  // order: [["sortID", "ASC"]]};

  Category.findAll(query)
    .then((categories) => {
      if (categories.length > 0) {
        // console.log("category-controller get / categories", categories);
        res.status(200).json({ categories: categories, resultsFound: true, message: "Successfully retrieved categories." });
      } else {
        // console.log("category-controller get / No Results");
        // res.status(200).send("No categories found.");
        // res.status(200).send({resultsFound: false, message: "No categories found."})
        res.status(200).json({ resultsFound: false, message: "No categories found." });
      };
    })
    .catch((err) => {
      console.log("category-controller get / err", err);
      res.status(500).json({ resultsFound: false, message: "No categories found.", error: err });
    });

});

/******************************
 ***** Get Categories *********
 ******************************/
// * Only returns categories that have titles linked to them
// * Need to return all categories that are active for the add title function
router.get("/", (req, res) => {

  const query = {
    where: {
      active: { [Op.eq]: true }
      // }, include: {all: true, nested: true}, order: [["sortID", "ASC"]]};
    }, order: [["sortID", "ASC"]]
  };
  // }, include: [
  //     {model: Title,
  //         where: {
  //             active: {[Op.eq]: true}
  //         }
  //     }
  // ], 
  // order: [["sortID", "ASC"]]};

  Category.findAll(query)
    .then((categories) => {
      if (categories.length > 0) {
        // console.log("category-controller get / categories", categories);
        res.status(200).json({ categories: categories, resultsFound: true, message: "Successfully retrieved categories." });
      } else {
        // console.log("category-controller get / No Results");
        // res.status(200).send("No categories found.");
        // res.status(200).send({resultsFound: false, message: "No categories found."})
        res.status(200).json({ resultsFound: false, message: "No categories found." });
      };
    })
    .catch((err) => {
      console.log("category-controller get / err", err);
      res.status(500).json({ resultsFound: false, message: "No categories found.", error: err });
    });

});

/******************************
 ***** Get Categories Admin *********
 ******************************/
// * Return all categories to adminster them
router.get("/admin", validateAdmin, (req, res) => {

  const query = { order: [["sortID", "ASC"]] };

  Category.findAll(query)
    .then((categories) => {
      if (categories.length > 0) {
        // console.log("category-controller get / categories", categories);
        res.status(200).json({ categories: categories, resultsFound: true, message: "Successfully retrieved categories." });
      } else {
        // console.log("category-controller get / No Results");
        // res.status(200).send("No categories found.");
        // res.status(200).send({resultsFound: false, message: "No categories found."})
        res.status(200).json({ resultsFound: false, message: "No categories found." });
      };
    })
    .catch((err) => {
      console.log("category-controller get / err", err);
      res.status(500).json({ resultsFound: false, message: "No categories found.", error: err });
    });

});

/**************************************
 ***** Get Category By CategoryID *****
***************************************/
router.get("/:categoryID", (req, res) => {

  const query = {
    where: {
      categoryID: { [Op.eq]: req.params.categoryID }
      // }, include: {all: true, nested: true}};
    }
  };

  // Category.findOne(query)
  Category.findAll(query)
    .then((categories) => {
      if (categories.length > 0) {
        // console.log("category-controller get /:categoryID categories", categories);
        res.status(200).json({ categories: categories, resultsFound: true, message: "Successfully retrieved category." });
        // res.status(200).json({
        // category:   categories.category,
        // sortID:     categories.sortID,
        // active:     categories.active,
        // message:    "Successfully retrieved category information."
        // });
      } else {
        // console.log("category-controller get /:categoryID No Results");
        // res.status(200).send("No categories found.");
        // res.status(200).send({resultsFound: false, message: "No categories found."})
        res.status(200).json({ resultsFound: false, message: "No categories found." });
      };
    })
    .catch((err) => {
      console.log("category-controller get /:categoryID err", err);
      res.status(500).json({ resultsFound: false, message: "No categories found.", error: err });
    });

});

/* ******************************
 *** Add Category ***************
*********************************/
// * Allows an admin to add a new category
router.post("/", validateAdmin, (req, res) => {

  // * Don't need this anymore; was trying to fix scoping issues
  // let newSortID = 0;

  // * Moved this inside the function for scoping issues with newSortID
  // const createCategory = {
  //     category:   req.body.category.category,
  //     sortID:     newSortID
  //   };

  Category.max("sortID")
    .then((maxSortID) => {
      // console.log("category-controller maxSortID", maxSortID);
      if (isNaN(maxSortID)) {
        // newSortID = 1;
        return 1;
      } else {
        // newSortID = maxSortID + 1;
        return maxSortID + 1;
      };
    })
    .then(newSortID => {
      // console.log("category-controller newSortID", newSortID);

      const createCategory = {
        category: req.body.category.category,
        sortID: newSortID
      };

      return Category.create(createCategory);
    })
    // .then((category) => res.status(200).json({category: category, message: "Category successfully created."}))
    .then((category) => {
      // console.log("category-controller post / category", category);
      res.status(200).json({
        categoryID: category.categoryID,
        category: category.category,
        sortID: category.sortID,
        active: category.active,
        createdAt: category.createdAt,
        updatedAt: category.updatedAt,
        recordAdded: true,
        message: "Category successfully created."
      });
    })
    .catch((err) => {
      console.log("category-controller post / err", err);
      res.status(500).json({ recordAdded: false, message: "Category not successfully created.", error: err });
    });

});

/***************************
 ******* Update Category *******
 ***************************/
// * Allows an admin to update the category including soft delete it
router.put("/:categoryID", validateAdmin, (req, res) => {

  const updateCategory = {
    category: req.body.category.category,
    sortID: req.body.category.sortID,
    active: req.body.category.active
  };

  const query = {
    where: {
      categoryID: { [Op.eq]: req.params.categoryID }
    }
  };

  Category.update(updateCategory, query)
    // ! Doesn't return the values of the updated record; the value passed to the function is the number of records updated.
    // .then((category) => res.status(200).json({message: category + " category record(s) successfully updated."}))
    .then((category) => {
      if (category > 0) {
        res.status(200).json({
          categoryID: parseInt(req.params.categoryID), // * The parameter value is passed as a string unless converted
          category: category.category,
          sortID: category.sortID,
          active: category.active,
          recordUpdated: true,
          // message:    "Category successfully updated."
          message: category + " category record(s) successfully updated."
        });
      } else {
        res.status(200).json({ recordUpdated: false, message: category + " category record(s) successfully updated." });
      };
    })
    .catch((err) => {
      console.log("category-controller put /:categoryID err", err);
      res.status(500).json({ recordUpdated: false, message: "Category not successfully updated.", error: err });
    });

});

/***************************
 ******* Delete Category *******
 ***************************/
// * Allows an admin to hard delete a category
router.delete("/:categoryID", validateAdmin, (req, res) => {

  const query = {
    where: {
      categoryID: { [Op.eq]: req.params.categoryID }
    }
  };

  Category.destroy(query)
    .then(() => res.status(200).json({ recordDeleted: true, message: "Category successfully deleted." }))
    .catch((err) => {
      console.log("category-controller delete /:categoryID err", err);
      res.status(500).json({ recordDeleted: false, message: "Category not successfully deleted.", error: err });
    });

});

module.exports = router;