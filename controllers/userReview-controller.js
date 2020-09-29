const router = require("express").Router();
const UserReview = require("../db").import("../models/userReview");
const {Op} = require("sequelize");
const validateSession = require("../middleware/validate-session");
const validateAdmin = require("../middleware/validate-admin");

/******************************
 ***** Get User Reviews *********
 ******************************/
router.get("/", (req, res) => {

    const query = {where: {
        active: {[Op.eq]: true}
    }};

    const orderBy = {order: 
        [["updatedAt", "DESC"]]
    };
   
    UserReview.findAll(query, orderBy)
      .then((userReviews) => res.status(200).json({
        reviewID:   userReviews.reviewID,
        userID:     userReviews.userID,
        updatedBy:  userReviews.updatedBy,
        titleID:    userReviews.titleID,
        read:       userReviews.read,
        dateRead:   userReviews.dateRead,
        rating:     userReviews.rating,
        shortReview:   userReviews.shortReview,
        longReview:   userReviews.longReview,
        active:     userReviews.active,
        message:    "Successfully retrieved user reviews."
    }))
      .catch((err) => res.status(500).json({error: err}));

});

/**************************************
 ***** Get User Review By ReviewID *****
***************************************/
router.get("/:reviewID", (req, res) => {

    const query = {where: {
        reviewID: {[Op.eq]: req.params.reviewID}
    }};

    UserReview.findOne(query)
    .then((userReview) => res.status(200).json({
        reviewID:   userReviews.reviewID,
        userID:     userReviews.userID,
        updatedBy:  userReviews.updatedBy,
        titleID:    userReviews.titleID,
        read:       userReviews.read,
        dateRead:   userReviews.dateRead,
        rating:     userReviews.rating,
        shortReview:   userReviews.shortReview,
        longReview:   userReviews.longReview,
        active:     userReviews.active,
        message:    "Successfully retrieved user review information."
        }))
    .catch((err) => res.status(500).json({error: err}));

});

/**************************************
 ***** Get Total Average Rating By TitleID *****
***************************************/
// Gets the overall rating for the title
// router.get("/rating/:titleID", (req, res) => {

    // const query = {where: {
    //     [Op.and]: [
    //     {titleID: {[Op.eq]: req.params.titleID}},
    //     {active: {[Op.eq]: true}}
    //     ]
    // }};

//     UserReview.findAll(query)
//     .then((userReview) => res.status(200).json({
//         titleID:    userReview.titleID,
//         overallRating:     userReview.overallRating,
//         message:    "Successfully retrieved user overall rating."
//         }))
//     .catch((err) => res.status(500).json({error: err}));

// });

/**************************************
 ***** Get User Review Count Rating By TitleID *****
***************************************/
// Gets the user review count for the title
// No sure if the code is right for this?
router.get("/count/:titleID", (req, res) => {

    const query = {where: {
        [Op.and]: [
        {titleID: {[Op.eq]: req.params.titleID}},
        {active: {[Op.eq]: true}}
        ]
    }};

    UserReview.count(query)
    .then((userReview) => res.status(200).json({
        userReviewCount:    userReview,
        message:    "Successfully retrieved user review count."
        }))
    .catch((err) => res.status(500).json({error: err}));

});

/**************************************
 ***** Get User Review Rating Sum By TitleID *****
***************************************/
// Gets the sum of ratings for the title
// No sure if the code is right for this?
router.get("/sum/:titleID", (req, res) => {

    const query = {where: {
        [Op.and]: [
        {titleID: {[Op.eq]: req.params.titleID}},
        {active: {[Op.eq]: true}}
        ]
    }};

    UserReview.sum(query)
    .then((userReview) => res.status(200).json({
        userReviewCount:    userReview,
        message:    "Successfully retrieved user review sum."
        }))
    .catch((err) => res.status(500).json({error: err}));

});

/**************************************
 ***** Get User Reviews By TitleID *****
***************************************/
// Gets all user review by TitleID plus the overall rating for the title
router.get("/title/:titleID", (req, res) => {

    const attributes = {
        attributes: [
        "reviewID", "userID", "updatedBy", "titleID", "read", "dateRead:   userReviews.dateRead", "rating", "shortReview", "longReview", "active", 
        [sequelize.fn("count", sequelize.col("reviewID")), "userReviewCount"],
        [sequelize.fn("sum", sequelize.col("reviewID")), "userReviewSum"],
        ]
      };

      const query = {where: {
        [Op.and]: [
        {titleID: {[Op.eq]: req.params.titleID}},
        {active: {[Op.eq]: true}}
        ]
    }};

    const orderBy = {order: 
        [["updatedAt", "DESC"]]
    };

    UserReview.findAll(attributes, query, orderBy)
    .then((userReviews) => res.status(200).json({
        reviewID:   userReviews.reviewID,
        userID:     userReviews.userID,
        updatedBy:  userReviews.updatedBy,
        titleID:    userReviews.titleID,
        read:       userReviews.read,
        dateRead:   userReviews.dateRead,
        rating:     userReviews.rating,
        shortReview:   userReviews.shortReview,
        longReview:   userReviews.longReview,
        active:     userReviews.active,
        userReviewCount:   userReviews.userReviewCount,
        userReviewSum:     userReviews.userReviewSum,
        message:    "Successfully retrieved user reviews."
        }))
    .catch((err) => res.status(500).json({error: err}));

});
  
/**************************************
 ***** Get User Reviews By UserID *****
***************************************/
router.get("/user/:userID", (req, res) => {

    const query = {where: {
        [Op.and]: [
        {titleID: {[Op.eq]: req.params.titleID}},
        {active: {[Op.eq]: true}}
        ]
    }};

    const orderBy = {order: 
        [["updatedAt", "DESC"]]
    };

    UserReview.findAll(query, orderBy)
    .then((userReviews) => res.status(200).json({
        reviewID:   userReviews.reviewID,
        userID:     userReviews.userID,
        updatedBy:  userReviews.updatedBy,
        titleID:    userReviews.titleID,
        read:       userReviews.read,
        dateRead:   userReviews.dateRead,
        rating:     userReviews.rating,
        shortReview:   userReviews.shortReview,
        longReview:   userReviews.longReview,
        active:     userReviews.active,
        message:    "Successfully retrieved user reviews."
        }))
    .catch((err) => res.status(500).json({error: err}));

});

/* ******************************
 *** Add User Review  ***************
*********************************/
// Allows a user to add a new user review
router.post("/", validateSession, (req, res) => {

    const createUserReview = {
        userID:     req.user.userID,
        updatedBy:  req.user.userID,
        titleID:    req.body.userReview.titleID,
        read:       req.body.userReview.read,
        dateRead:   req.body.userReview.dateRead,
        rating:     req.body.userReview.rating,
        shortReview:   req.body.userReview.shortReview,
        longReview:   req.body.userReview.longReview,
        active:     req.body.userReview.active
      };

      UserReview.create(createUserReview)
    .then((userReview) => res.status(200).json({
        reviewID:   userReviews.reviewID,
        userID:     userReviews.userID,
        updatedBy:  userReviews.updatedBy,
        titleID:    userReviews.titleID,
        read:       userReviews.read,
        dateRead:   userReviews.dateRead,
        rating:     userReviews.rating,
        shortReview:   userReviews.shortReview,
        longReview:   userReviews.longReview,
        active:     userReviews.active,
        message:    "User review successfully created."
    }))
    .catch(err => res.status(500).json({error: err}))
});

/***************************
 ******* Update User Review  *******
 ***************************/
// Allows the user to update the user review including soft delete it
router.put("/:reviewID", validateSession, (req, res) => {

    const updateUserReview = {
        userID:     req.user.userID,
        updatedBy:  req.user.userID,
        titleID:    req.body.userReview.titleID,
        read:       req.body.userReview.read,
        dateRead:   req.body.userReview.dateRead,
        rating:     req.body.userReview.rating,
        shortReview:   req.body.userReview.shortReview,
        longReview:   req.body.userReview.longReview,
        active:     req.body.userReview.active
      };

      const query = {where: {
        reviewID: {[Op.eq]: req.params.reviewID}
    }};

    UserReview.update(updateUserReview, query)
    .then((userReview) => res.status(200).json({
        reviewID:   userReviews.reviewID,
        userID:     userReviews.userID,
        updatedBy:  userReviews.updatedBy,
        titleID:    userReviews.titleID,
        read:       userReviews.read,
        dateRead:   userReviews.dateRead,
        rating:     userReviews.rating,
        shortReview:   userReviews.shortReview,
        longReview:   userReviews.longReview,
        active:     userReviews.active,
        message:    "User review successfully updated."
    }))
    .catch((err) => res.status(500).json({error: err}));

  });

/***************************
 ******* Update User Review  *******
 ***************************/
// Allows the admin to update the user review including soft delete it
router.put("/admin/:reviewID", validateAdmin, (req, res) => {

    const updateUserReview = {
        userID:     req.body.userReview.userID,
        updatedBy:  req.user.userID,
        titleID:    req.body.userReview.titleID,
        read:       req.body.userReview.read,
        dateRead:   req.body.userReview.dateRead,
        rating:     req.body.userReview.rating,
        shortReview:   req.body.userReview.shortReview,
        longReview:   req.body.userReview.longReview,
        active:     req.body.userReview.active
      };

      const query = {where: {
        reviewID: {[Op.eq]: req.params.reviewID}
    }};

    UserReview.update(updateUserReview, query)
    .then((userReview) => res.status(200).json({
        reviewID:   userReviews.reviewID,
        userID:     userReviews.userID,
        updatedBy:  userReviews.updatedBy,
        titleID:    userReviews.titleID,
        read:       userReviews.read,
        dateRead:   userReviews.dateRead,
        rating:     userReviews.rating,
        shortReview:   userReviews.shortReview,
        longReview:   userReviews.longReview,
        active:     userReviews.active,
        message:    "User review successfully updated."
    }))
    .catch((err) => res.status(500).json({error: err}));

  });

/***************************
 ******* Delete User Review *******
 ***************************/
// Allows an admin to hard delete a review
router.delete("/:reviewID", validateAdmin, (req, res) => {

    const query = {where: {
        reviewID: {[Op.eq]: req.params.reviewID}
    }};

    UserReview.destroy(query)
    .then(() => res.status(200).send("User review successfully deleted."))
    .catch((err) => res.status(500).json({error: err}));

  });

module.exports = router;