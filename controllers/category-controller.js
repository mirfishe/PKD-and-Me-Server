const router = require('express').Router();
const Category = require('../db').import('../models/category');

/******************************
 ***** Get Categories *********
 ******************************/
router.get("/", (req, res) => {

    const orderBy = {order: 
        [["category", 'DESC']]
    };
    
    Category.findAll(orderBy)
      .then((categories) => res.status(200).json({
        category:   category.category,
        message:    'Successfully retrieved categories.'
    }))
      .catch((err) => res.status(500).json({ error: err }));

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
        message:    'Successfully retrieved category information.'
        }))
    .catch((err) => res.status(500).json({ error: err }));

});

/* ******************************
 *** Add Category ***************
*********************************/
// Allows an admin to add a new category
router.post('/', function(req, res) {

    const createCategory = {
        category:   req.body.category.category,
        active:     req.body.category.active
      };

    Category.create(createCategory)
    .then((category) => res.status(200).json({
        category:   category.category,
        active:     category.active,
        message:    'Category successfully created.'
    }))
    .catch((err) => res.status(500).json({ error: err }));
        createError = (err) => res.status(500).json(err)
    )
    .catch(err => res.status(500).json({error: err}))
});

/***************************
 ******* Update Category *******
 ***************************/
// Allows an admin to update the category including soft delete it
router.put("/:categoryID", validateAdmin, (req, res) => {

    const updateCategory= {
        category:   req.body.category.category,
        active:     req.body.category.active
      };

      const query = {where: {
        categoryID: {[Op.eq]: req.params.categoryID}
    }};

    Category.update(updateCategory, query)
    .then((category) => res.status(200).json({
        category:   category.category,
        active:     category.active,
        message:    'Category successfully updated.'
    }))
    .catch((err) => res.status(500).json({ error: err }));

  });

module.exports = router;