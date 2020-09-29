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
    .then((userReviews) => {
        // console.log("userReview-controller get / userReviews", userReviews);
        res.status(200).json({userReviews: userReviews, message: "Successfully retrieved user reviews."});
    })
    .catch((err) => {
        console.log("userReview-controller get / err", err);
        res.status(500).json({error: err});
    });

});

/**************************************
 ***** Get User Review By ReviewID *****
***************************************/
router.get("/:reviewID", (req, res) => {

    const query = {where: {
        reviewID: {[Op.eq]: req.params.reviewID}
    }};

    UserReview.findOne(query)
    .then((userReview) => {
        // console.log("userReview-controller get /:reviewID userReview", userReview);
        res.status(200).json({
        reviewID:   userReview.reviewID,
        userID:     userReview.userID,
        updatedBy:  userReview.updatedBy,
        titleID:    userReview.titleID,
        read:       userReview.read,
        dateRead:   userReview.dateRead,
        rating:     userReview.rating,
        shortReview:   userReview.shortReview,
        longReview:   userReview.longReview,
        active:     userReview.active,
        message:    "Successfully retrieved user review information."
        });
    })
    .catch((err) => {
        console.log("userReview-controller get /:reviewID err", err);
        res.status(500).json({error: err});
    });

});

/**************************************
 ***** Get Total Average Rating By TitleID *****
***************************************/
// Gets the overall rating for the title
// router.get("/rating/:titleID", (req, res) => {

//     const query = {where: {
//         [Op.and]: [
//         {titleID: {[Op.eq]: req.params.titleID}},
//         {active: {[Op.eq]: true}}
//         ]
//     }};

//     UserReview.findAll(query)
//     .then((userReview) => res.status(200).json({
//         titleID:    userReview.titleID,
//         overallRating:     userReview.overallRating,
//         message:    "Successfully retrieved user overall rating."
//         }))
//         .catch((err) => {
//             console.log("userReview-controller get /rating/:titleID err", err);
//             res.status(500).json({error: err});
//         });

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
    .then((userReview) => {
        console.log("userReview-controller get /count/:titleID userReview", userReview);
        res.status(200).json({
        userReviewCount:    userReview,
        message:    "Successfully retrieved user review count."});
    })
    .catch((err) => {
        console.log("userReview-controller get /count/:titleID err", err);
        res.status(500).json({error: err});
    });

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
    .then((userReview) => {
        console.log("userReview-controller get /sum/:titleID userReview", userReview);
        res.status(200).json({
        userReviewCount:    userReview,
        message:    "Successfully retrieved user review sum."});
    })
    .catch((err) => {
        console.log("userReview-controller get /sum/:titleID err", err);
        res.status(500).json({error: err});
    });

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
    .then((userReviews) => {
        // console.log("userReview-controller get /title/:titleID userReviews", userReviews);
        res.status(200).json({userReviews: userReviews, message: "Successfully retrieved user reviews."});
    })
    .catch((err) => {
        console.log("userReview-controller get /title/:titleID err", err);
        res.status(500).json({error: err});
    });

});
  
/**************************************
 ***** Get User Reviews By UserID *****
***************************************/
router.get("/user/:userID", (req, res) => {

    const query = {where: {
        [Op.and]: [
        {userID: {[Op.eq]: req.params.userID}},
        {active: {[Op.eq]: true}}
        ]
    }};

    const orderBy = {order: 
        [["updatedAt", "DESC"]]
    };

    UserReview.findAll(query, orderBy)
    .then((userReviews) => {
        // console.log("userReview-controller get /user/:userID" userReviews", userReviews);
        res.status(200).json({userReviews: userReviews, message: "Successfully retrieved user reviews."});
    })
    .catch((err) => {
        console.log("userReview-controller get /user/:userID err", err);
        res.status(500).json({error: err});
    });

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
        longReview:   req.body.userReview.longReview
      };

    UserReview.create(createUserReview)
    .then((userReview) => {
        // console.log("userReview-controller post / userReview", userReview);
        res.status(200).json({
        reviewID:   userReview.reviewID,
        userID:     userReview.userID,
        updatedBy:  userReview.updatedBy,
        titleID:    userReview.titleID,
        read:       userReview.read,
        dateRead:   userReview.dateRead,
        rating:     userReview.rating,
        shortReview:   userReview.shortReview,
        longReview:   userReview.longReview,
        active:     userReview.active,
        message:    "User review successfully created."
        });
    })
    .catch((err) => {
        console.log("userReview-controller post / err", err);
        res.status(500).json({error: err});
    });
    
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
        [Op.and]: [
            {reviewID: {[Op.eq]: req.params.reviewID}},
            {userID: {[Op.eq]: req.user.userID}}
            ]
    }};

    UserReview.update(updateUserReview, query)
    // Doesn't return the values of the updated record; the value passed to the function is the number of records updated.
    // .then((userReview) => res.status(200).json({message: userReview + " user review record(s) successfully updated."}))
    .then((userReview) => res.status(200).json({
        reviewID:     req.params.reviewID,
        userID:     req.user.userID,
        updatedBy:  req.user.userID,
        titleID:    req.body.userReview.titleID,
        read:       req.body.userReview.read,
        dateRead:   req.body.userReview.dateRead,
        rating:     req.body.userReview.rating,
        shortReview:   req.body.userReview.shortReview,
        longReview:   req.body.userReview.longReview,
        active:     req.body.userReview.active,
        // message:    "User review successfully updated."
        message: userReview + " user review record(s) successfully updated."
    }))
    .catch((err) => {
        console.log("userReview-controller put /:reviewID err", err);
        res.status(500).json({error: err});
    });

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
    // Doesn't return the values of the updated record; the value passed to the function is the number of records updated.
    // .then((userReview) => res.status(200).json({message: userReview + " user review record(s) successfully updated."}))
    .then((userReview) => res.status(200).json({
        reviewID:     req.params.reviewID,
        userID:     req.user.userID,
        updatedBy:  req.user.userID,
        titleID:    req.body.userReview.titleID,
        read:       req.body.userReview.read,
        dateRead:   req.body.userReview.dateRead,
        rating:     req.body.userReview.rating,
        shortReview:   req.body.userReview.shortReview,
        longReview:   req.body.userReview.longReview,
        active:     req.body.userReview.active,
        // message:    "User review successfully updated."
        message: userReview + " user review record(s) successfully updated."
    }))
    .catch((err) => {
        console.log("userReview-controller put /admin/:reviewID err", err);
        res.status(500).json({error: err});
    });

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
    .catch((err) => {
        console.log("userReview-controller delete /:reviewID err", err);
        res.status(500).json({error: err});
    });

  });

module.exports = router;