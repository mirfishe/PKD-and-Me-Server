const router = require("express").Router();
const UserReview = require("../db").import("../models/userReview");
const {Op} = require("sequelize");
const Sequelize = require('sequelize');
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
        if (userReviews.length > 0) {
            // console.log("userReview-controller get / userReviews", userReviews);
            res.status(200).json({userReviews: userReviews, resultsFound: true, message: "Successfully retrieved user reviews."});
        } else {
            // console.log("userReview-controller get / No Results");
            // res.status(200).send("No user reviews found.");
            // res.status(200).send({resultsFound: false, message: "No user reviews found."})
            res.status(200).json({resultsFound: false, message: "No user reviews found."});
        };
    })
    .catch((err) => {
        console.log("userReview-controller get / err", err);
        res.status(500).json({resultsFound: false, message: "No user reviews found.", error: err});
    });

});

/**************************************
 ***** Get User Review By ReviewID *****
***************************************/
router.get("/:reviewID", (req, res) => {

    const query = {where: {
        reviewID: {[Op.eq]: req.params.reviewID}
    }};

    // UserReview.findOne(query)
    UserReview.findAll(query)
    .then((userReviews) => {
        if (userReviews.length > 0) {
            // console.log("userReview-controller get /:reviewID userReviews", userReviews);
            res.status(200).json({userReviews: userReviews, resultsFound: true, message: "Successfully retrieved user reviews."});
            // res.status(200).json({
            // reviewID:   userReview.reviewID,
            // userID:     userReview.userID,
            // updatedBy:  userReview.updatedBy,
            // titleID:    userReview.titleID,
            // read:       userReview.read,
            // dateRead:   userReview.dateRead,
            // rating:     userReview.rating,
            // shortReview:   userReview.shortReview,
            // longReview:   userReview.longReview,
            // active:     userReview.active,
            // message:    "Successfully retrieved user review information."
            // });
        } else {
            // console.log("userReview-controller get /:reviewID No Results");
            // res.status(200).send("No user reviews found.");
            // res.status(200).send({resultsFound: false, message: "No user reviews found."})
            res.status(200).json({resultsFound: false, message: "No user reviews found."});
        };
    })
    .catch((err) => {
        console.log("userReview-controller get /:reviewID err", err);
        res.status(500).json({resultsFound: false, message: "No user reviews found.", error: err});
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
//             res.status(500).json({resultsFound: false, message: "No user reviews found.", error: err});
//         });

// });

/**************************************
 ***** Get User Review Count Rating By TitleID *****
***************************************/
// Gets the user review count for the title
// Don't need because the count comes back with the get user reviews by titleID
// router.get("/count/:titleID", (req, res) => {

//     const query = {where: {
//         [Op.and]: [
//         {titleID: {[Op.eq]: req.params.titleID}},
//         {active: {[Op.eq]: true}}
//         ]
//     }};

//     UserReview.count(query)
//     .then((userReview) => {
//         // console.log("userReview-controller get /count/:titleID userReview", userReview);
//         res.status(200).json({
//         userReviewCount:    userReview,
//         message:    "Successfully retrieved user review count."});
//     })
//     .catch((err) => {
//         console.log("userReview-controller get /count/:titleID err", err);
//         res.status(500).json({resultsFound: false, message: "No user reviews found.", error: err});
//     });

// });

/**************************************
 ***** Get User Review Rating Sum By TitleID *****
***************************************/
// Gets the sum of ratings for the title
router.get("/sum/:titleID", (req, res) => {

    const query = {where: {
        [Op.and]: [
        {titleID: {[Op.eq]: req.params.titleID}},
        {active: {[Op.eq]: true}}
        ]
    }};

    UserReview.sum("rating", query)
    .then((userReview) => {
        // console.log("userReview-controller get /sum/:titleID userReview", userReview);
        res.status(200).json({
        userReviewCount:    userReview,
        message:    "Successfully retrieved user review sum."});
    })
    .catch((err) => {
        console.log("userReview-controller get /sum/:titleID err", err);
        res.status(500).json({resultsFound: false, message: "Did not successfully retrieved user review sum.", error: err});
    });

});

/**************************************
 ***** Get User Review Rating By TitleID *****
***************************************/
// Gets the sum and count of ratings for the title
// Not working with raw SQL query or findAll
// router.get("/rating/:titleID", (req, res) => {

//     const attributes = {
//         attributes: [
//         // "reviewID", "userID", "updatedBy", "titleID", "read", "dateRead", "rating", "shortReview", "longReview", "active", 
//         [Sequelize.fn("count", Sequelize.col("reviewID")), "userReviewCount"],
//         [Sequelize.fn("sum", Sequelize.col("rating")), "userReviewSum"]
//         ]
//     };

//     const groupBy = {
//         group: ["rating"]
//     };

//     const query = {where: {
//         [Op.and]: [
//         {titleID: {[Op.eq]: req.params.titleID}},
//         {active: {[Op.eq]: true}}
//         ]
//     }};

//     const querySQL = "SELECT COUNT(\"rating\") AS \"userReviewCount\", SUM(\"rating\") AS \"userReviewSum\" FROM \"userReviews\" WHERE \"titleID\" = 3 AND \"active\" = true GROUP By rating";

//     // UserReview.findAll(attributes, groupBy, query)
//     Sequelize.query(querySQL)
//     .then((userReview) => {
//         // console.log("userReview-controller get /rating/:titleID userReview", userReview);
//         res.status(200).json({
//         userReviewCount:    userReview,
//         message:    "Successfully retrieved user review sum."});
//     })
//     .catch((err) => {
//         console.log("userReview-controller get /rating/:titleID err", err);
//         res.status(500).json({resultsFound: false, message: "No user reviews found.", error: err});
//     });

// });

/**************************************
 ***** Get User Reviews By TitleID *****
***************************************/
// Gets all user reviews by TitleID and the count
// Would like to add the overall rating for the title
router.get("/title/:titleID", (req, res) => {

    // Not being used because the SQL query doesn't come out correctly
    // SELECT fields not in GROUP BY
    // const attributes = {
    //     attributes: [
    //     "reviewID", "userID", "updatedBy", "titleID", "read", "dateRead", "rating", "shortReview", "longReview", "active", 
    //     // [Sequelize.fn("count", Sequelize.col("reviewID")), "userReviewCount"],
    //     [Sequelize.fn("sum", Sequelize.col("rating")), "userReviewSum"]
    //     // count("rating"),
    //     // sum("rating")
    //     ]
    // };

    // const groupBy = {
    //     group: ["rating"]
    // };

    const query = {where: {
        [Op.and]: [
        {titleID: {[Op.eq]: req.params.titleID}},
        {active: {[Op.eq]: true}}
        ]
    }};

    const orderBy = {order: 
        [["updatedAt", "DESC"]]
    };

    UserReview.findAndCountAll(query, orderBy)
    // UserReview.findAll(attributes, query, groupBy, orderBy)
    .then((userReviews) => {
        if (userReviews.length > 0) {
        // console.log("userReview-controller get /title/:titleID userReviews", userReviews);
        res.status(200).json({userReviews: userReviews, resultsFound: true, message: "Successfully retrieved user reviews."});
    } else {
        // console.log("userReview-controller get /title/:titleID No Results");
        // res.status(200).send("No user reviews found.");
        // res.status(200).send({resultsFound: false, message: "No user reviews found."})
        res.status(200).json({resultsFound: false, message: "No user reviews found."});
    };
    })
    .catch((err) => {
        console.log("userReview-controller get /title/:titleID err", err);
        res.status(500).json({resultsFound: false, message: "No user reviews found.", error: err});
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
        if (userReviews.length > 0) {
            // console.log("userReview-controller get /user/:userID" userReviews", userReviews);
            res.status(200).json({userReviews: userReviews, resultsFound: true, message: "Successfully retrieved user reviews."});
        } else {
            // console.log("userReview-controller get /user/:userID No Results");
            // res.status(200).send("No user reviews found.");
            // res.status(200).send({resultsFound: false, message: "No user reviews found."})
            res.status(200).json({resultsFound: false, message: "No user reviews found."});
        };
    })
    .catch((err) => {
        console.log("userReview-controller get /user/:userID err", err);
        res.status(500).json({resultsFound: false, message: "No user reviews found.", error: err});
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
        recordAdded: true,
        message:    "User review successfully created."
        });
    })
    .catch((err) => {
        console.log("userReview-controller post / err", err);
        res.status(500).json({recordAdded: false, message: "User review not successfully created.", error: err});
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
    .then((userReview) => {
        if (userReview > 0) {
            res.status(200).json({
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
            recordUpdated: true,
            // message:    "User review successfully updated."
            message: userReview + " user review record(s) successfully updated."
            });
        } else {
            res.status(200).json({recordUpdated: false, message: userReview + " user review record(s) successfully updated."});
        };
    })
    .catch((err) => {
        console.log("userReview-controller put /:reviewID err", err);
        res.status(500).json({recordUpdated: false, message: "User review not successfully updated.", error: err});
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
    .then((userReview) => {
        if (userReview > 0) {
            res.status(200).json({
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
            recordUpdated: true,
            // message:    "User review successfully updated."
            message: userReview + " user review record(s) successfully updated."
            });
        } else {
            res.status(200).json({recordUpdated: false, message: userReview + " user review record(s) successfully updated."});
        };
    })
    .catch((err) => {
        console.log("userReview-controller put /admin/:reviewID err", err);
        res.status(500).json({recordUpdated: false, message: "User review not successfully updated.", error: err});
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
    .then(() => res.status(200).json({recordDeleted: true, message: "User review successfully deleted."}))
    .catch((err) => {
        console.log("userReview-controller delete /:reviewID err", err);
        res.status(500).json({recordDeleted: false, message: "User review not successfully deleted.", error: err});
    });

  });

module.exports = router;