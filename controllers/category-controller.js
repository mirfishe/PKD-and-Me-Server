const router = require('express').Router();
const Category = require('../db').import('../models/category');
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
        [["sortID", 'DESC']]
    };
    
    Category.findAll(query, orderBy)
      .then((categories) => res.status(200).json({
        category:   category.category,
        sortID:     category.sortID,
        active:     category.active,
        message:    'Successfully retrieved categories.'
    }))
      .catch((err) => res.status(500).json({error: err}));

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
        message:    'Successfully retrieved category information.'
        }))
    .catch((err) => res.status(500).json({error: err}));

});

/* ******************************
 *** Add Category ***************
*********************************/
// Allows an admin to add a new category
router.post('/', (req, res) => {

    const createCategory = {
        category:   req.body.category.category,
        active:     req.body.category.active
      };

    Category.max('sortID')
    .then((maxSortID) => {
        // console.log("maxSortID", maxSortID);
        if (isNaN(maxSortID)) {
            return 1;
        } else {
            return maxSortID + 1;
        };
    })
    .then(newSortID => {
        Category.create(createCategory)
    })
    .then((category) => res.status(200).json({
        category:   category.category,
        sortID:     newSortID,
        active:     category.active,
        message:    'Category successfully created.'
    }))
    .catch(err => res.status(500).json({error: err}))
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
    .then((category) => res.status(200).json({
        category:   category.category,
        sortID:     category.sortID,
        active:     category.active,
        message:    'Category successfully updated.'
    }))
    .catch((err) => res.status(500).json({error: err}));

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
    .catch((err) => res.status(500).json({error: err}));

  });

module.exports = router;