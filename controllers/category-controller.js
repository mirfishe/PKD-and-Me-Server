const router = require("express").Router();
const Category = require("../db").import("../models/category");
const {Op} = require("sequelize");
const validateSession = require("../middleware/validate-session");
const validateAdmin = require("../middleware/validate-admin");

/******************************
 ***** Get Categories *********
 ******************************/
router.get("/", (req, res) => {

    const query = {where: {
        active: {[Op.eq]: true}
    }};

    const orderBy = {order: 
        [["sortID", "DESC"]]
    };
    
    Category.findAll(query, orderBy)
    .then((categories) => {
        // console.log("category-controller get / categories", categories);
        res.status(200).json({categories: categories, message: "Successfully retrieved categories."});
    })
    //   .then((categories) => res.status(200).json({
    //     category:   category.category,
    //     sortID:     category.sortID,
    //     active:     category.active,
    //     message:    "Successfully retrieved categories."
    // }))
    .catch((err) => {
        console.log("category-controller get / err", err);
        res.status(500).json({error: err});
    });

});
  
/**************************************
 ***** Get Category By CategoryID *****
***************************************/
router.get("/:categoryID", (req, res) => {

    const query = {where: {
        categoryID: {[Op.eq]: req.params.categoryID}
    }};

    Category.findOne(query)
    .then((category) => res.status(200).json({
        category:   category.category,
        sortID:     category.sortID,
        active:     category.active,
        message:    "Successfully retrieved category information."
        }))
        .catch((err) => {
            console.log("category-controller get /:categoryID err", err);
            res.status(500).json({error: err});
        });

});

/* ******************************
 *** Add Category ***************
*********************************/
// Allows an admin to add a new category
router.post("/", validateAdmin, (req, res) => {

    // Don't need this anymore; was trying to fix scoping issues
    //let newSortID = 0;

    // Moved this inside the function for scoping issues with newSortID
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
            category:   req.body.category.category,
            sortID:     newSortID
        };

        return Category.create(createCategory);
    })
    // .then((category) => res.status(200).json({category: category, message: "Category successfully created."}))
    .then((category) => {
        // console.log("category-controller post / category", category);
        res.status(200).json({
        category:   category.category,
        sortID:     category.sortID,
        active:     category.active,
        message:    "Category successfully created."
        });
    })
    .catch((err) => {
        console.log("category-controller post / err", err);
        res.status(500).json({error: err});
    });

});

/***************************
 ******* Update Category *******
 ***************************/
// Allows an admin to update the category including soft delete it
router.put("/:categoryID", validateAdmin, (req, res) => {

    const updateCategory = {
        category:   req.body.category.category,
        sortID:   req.body.category.sortID,
        active:     req.body.category.active
      };

      const query = {where: {
        categoryID: {[Op.eq]: req.params.categoryID}
    }};

    Category.update(updateCategory, query)
    // Doesn't return the values of the updated record; the value passed to the function is the number of records updated.
    // .then((category) => res.status(200).json({message: category + " category record(s) successfully updated."}))
    .then((category) => res.status(200).json({
        category:   category.category,
        sortID:     category.sortID,
        active:     category.active,
        // message:    "Category successfully updated."
        message:    category + " category record(s) successfully updated."
    }))
    .catch((err) => {
        console.log("category-controller put /:categoryID err", err);
        res.status(500).json({error: err});
    });

  });

/***************************
 ******* Delete Category *******
 ***************************/
// Allows an admin to hard delete a category
router.delete("/:categoryID", validateAdmin, (req, res) => {

    const query = {where: {
        categoryID: {[Op.eq]: req.params.categoryID}
    }};

    Category.destroy(query)
    .then(() => res.status(200).send("Category successfully deleted."))
    .catch((err) => {
        console.log("category-controller delete /:categoryID err", err);
        res.status(500).json({error: err});
    });

  });

module.exports = router;