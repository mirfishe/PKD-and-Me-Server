const router = require("express").Router();
const Title = require("../db").import("../models/title");
const {Op} = require("sequelize");
const validateSession = require("../middleware/validate-session");
const validateAdmin = require("../middleware/validate-admin");

/******************************
 ***** Get Titles *********
 ******************************/
router.get("/", (req, res) => {

    const query = {where: {
        active: {[Op.eq]: true}
    }};

    const orderBy = {order: 
        [["titleSort", "DESC"]]
    };
   
    Title.findAll(query, orderBy)
      .then((titles) => res.status(200).json({
        titleID:   titles.titleID,
        titleName:     titles.titleName,
        titleSort:  titles.titleSort,
        authorFirstName:   titles.authorFirstName,
        authorLastName:     titles.authorLastName,
        publicationDate:  titles.publicationDate,
        imageName:   titles.imageName,
        categoryID:   titles.categoryID,
        shortDescription:     titles.shortDescription,
        urlPKDweb:  titles.urlPKDweb,
        active:     titles.active,
        message:    "Successfully retrieved titles."
    }))
      .catch((err) => res.status(500).json({error: err}));

});

/**************************************
 ***** Get Title By TitleID *****
***************************************/
router.get("/:titleID", (req, res) => {

    const query = {where: {
        titleID: {[Op.eq]: req.params.titleID}
    }};

    Title.findOne(query)
    .then((title) => res.status(200).json({
        titleID:   titles.titleID,
        titleName:     titles.titleName,
        titleSort:  titles.titleSort,
        authorFirstName:   titles.authorFirstName,
        authorLastName:     titles.authorLastName,
        publicationDate:  titles.publicationDate,
        imageName:   titles.imageName,
        categoryID:   titles.categoryID,
        shortDescription:     titles.shortDescription,
        urlPKDweb:  titles.urlPKDweb,
        active:     titles.active,
        message:    "Successfully retrieved title."
        }))
    .catch((err) => res.status(500).json({error: err}));

});

// ADD OVERALL RATING TO GET TITLE?
/**************************************
 ***** Get User Reviews By TitleID *****
***************************************/
// Gets all user review by TitleID plus the overall rating for the title
// router.get("/title/:titleID", (req, res) => {

//     const attributes = {
//         attributes: [
//         "reviewID", "userID", "updatedBy", "titleID", "read", "dateRead:   userReviews.dateRead", "rating", "shortReview", "longReview", "active", 
//         [sequelize.fn("count", sequelize.col("reviewID")), "userReviewCount"],
//         [sequelize.fn("sum", sequelize.col("reviewID")), "userReviewSum"],
//         ]
//       };

//     const query = {where: {
//         titleID: {[Op.eq]: req.params.titleID}
//     }};

//     Title.findAll(attributes, query)
//     .then((userReviews) => res.status(200).json({
//         reviewID:   userReviews.reviewID,
//         userID:     userReviews.userID,
//         updatedBy:  userReviews.updatedBy,
//         titleID:    userReviews.titleID,
//         read:       userReviews.read,
//         dateRead:   userReviews.dateRead,
//         rating:     userReviews.rating,
//         shortReview:   userReviews.shortReview,
//         longReview:   userReviews.longReview,
//         active:     userReviews.active,
//         userReviewCount:   userReviews.userReviewCount,
//         userReviewSum:     userReviews.userReviewSum,
//         message:    "Successfully retrieved user reviews."
//         }))
//     .catch((err) => res.status(500).json({error: err}));

// });
  
/**************************************
 ***** Get Titles By MediaID *****
***************************************/
// Needed? Use Get Editions instead?
router.get("/media/:mediaID", (req, res) => {

    const query = {where: {
        [Op.and]: [
            {mediaID: {[Op.eq]: req.params.mediaID}},
            {active: {[Op.eq]: true}}
            ]
    }};

    const orderBy = {order: 
        [["titleSort", "DESC"]]
    };

    Title.findAll(query, orderBy)
    .then((titles) => res.status(200).json({
        titleID:   titles.titleID,
        titleName:     titles.titleName,
        titleSort:  titles.titleSort,
        authorFirstName:   titles.authorFirstName,
        authorLastName:     titles.authorLastName,
        publicationDate:  titles.publicationDate,
        imageName:   titles.imageName,
        categoryID:   titles.categoryID,
        shortDescription:     titles.shortDescription,
        urlPKDweb:  titles.urlPKDweb,
        active:     titles.active,
        message:    "Successfully retrieved titles."
        }))
    .catch((err) => res.status(500).json({error: err}));

});
  
/**************************************
 ***** Get Titles By CategoryID *****
***************************************/
// Needed? Use Get Editions instead?
// Query needs to be changed to work
router.get("/category/:categoryID", (req, res) => {

    const query = {where: {
        [Op.and]: [
            {categoryID: {[Op.eq]: req.params.categoryID}},
            {active: {[Op.eq]: true}}
            ]
    }};

    const orderBy = {order: 
        [["titleSort", "DESC"]]
    };

    Title.findAll(query, orderBy)
    .then((titles) => res.status(200).json({
        titleID:   titles.titleID,
        titleName:     titles.titleName,
        titleSort:  titles.titleSort,
        authorFirstName:   titles.authorFirstName,
        authorLastName:     titles.authorLastName,
        publicationDate:  titles.publicationDate,
        imageName:   titles.imageName,
        categoryID:   titles.categoryID,
        shortDescription:     titles.shortDescription,
        urlPKDweb:  titles.urlPKDweb,
        active:     titles.active,
        message:    "Successfully retrieved titles."
        }))
    .catch((err) => res.status(500).json({error: err}));

});
/* ******************************
 *** Add Title ***************
*********************************/
// Allows an admin to add a new title
router.post("/", validateAdmin, (req, res) => {

    const createTitle = {
        titleName:     req.body.title.titleName,
        titleSort:  regexp_replace(lower(req.body.title.titleName), "^(an?|the) (.*)$", "\2, \1"),
        authorFirstName:   req.body.title.authorFirstName,
        authorLastName:     req.body.title.authorLastName,
        publicationDate:  req.body.title.publicationDate,
        imageName:   req.body.title.imageName,
        categoryID:   req.body.title.categoryID,
        shortDescription:     req.body.title.shortDescription,
        urlPKDweb:  req.body.title.urlPKDweb,
        active:     req.body.title.active
      };

      Title.create(createTitle)
    .then((title) => res.status(200).json({
        titleID:   titles.titleID,
        titleName:     titles.titleName,
        titleSort:  titles.titleSort,
        authorFirstName:   titles.authorFirstName,
        authorLastName:     titles.authorLastName,
        publicationDate:  titles.publicationDate,
        imageName:   titles.imageName,
        categoryID:   titles.categoryID,
        shortDescription:     titles.shortDescription,
        urlPKDweb:  titles.urlPKDweb,
        active:     titles.active,
        message:    "Title successfully created."
    }))
    .catch(err => res.status(500).json({error: err}))
});

/***************************
 ******* Update Title *******
 ***************************/
// Allows the admin to update the title including soft delete it
router.put("/:titleID", validateAdmin, (req, res) => {

    const updateTitle = {
        titleName:     req.body.title.titleName,
        titleSort:  regexp_replace(lower(req.body.title.titleName), "^(an?|the) (.*)$", "\2, \1"),
        authorFirstName:   req.body.title.authorFirstName,
        authorLastName:     req.body.title.authorLastName,
        publicationDate:  req.body.title.publicationDate,
        imageName:   req.body.title.imageName,
        categoryID:   req.body.title.categoryID,
        shortDescription:     req.body.title.shortDescription,
        urlPKDweb:  req.body.title.urlPKDweb,
        active:     req.body.title.active
      };

      const query = {where: {
        titleID: {[Op.eq]: req.params.titleID}
    }};

    Title.update(updateTitle, query)
    .then((title) => res.status(200).json({
        titleID:   titles.titleID,
        titleName:     titles.titleName,
        titleSort:  titles.titleSort,
        authorFirstName:   titles.authorFirstName,
        authorLastName:     titles.authorLastName,
        publicationDate:  titles.publicationDate,
        imageName:   titles.imageName,
        categoryID:   titles.categoryID,
        shortDescription:     titles.shortDescription,
        urlPKDweb:  titles.urlPKDweb,
        active:     titles.active,
        message:    "Title successfully updated."
    }))
    .catch((err) => res.status(500).json({error: err}));

  });

/***************************
 ******* Delete Title *******
 ***************************/
// Allows an admin to hard delete a title
router.delete("/:titleID", validateAdmin, (req, res) => {

    const query = {where: {
        titleID: {[Op.eq]: req.params.titleID}
    }};

    Title.destroy(query)
    .then(() => res.status(200).send("Title successfully deleted."))
    .catch((err) => res.status(500).json({error: err}));

  });

module.exports = router;