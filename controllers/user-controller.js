const router = require("express").Router();
const User = require("../db").import("../models/user");
const {Op} = require("sequelize");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validateSession = require("../middleware/validate-session");
const validateAdmin = require("../middleware/validate-admin");

/* ***********************************
 *** User Registration ***************
*********************************** */
router.post("/register", (req, res) => {

    const createUser = {
        firstName:  req.body.user.firstName,
        lastName:   req.body.user.lastName,
        email:      req.body.user.email,
        password:   bcrypt.hashSync(req.body.user.password)
      };

    User.create(createUser)
    .then(
        createSuccess = (user) => {
            let token = jwt.sign({userID: user.userID}, process.env.JWT_SECRET, {expiresIn: "1d"});
            res.json({
                // Need to return all the properties of the user to the browser?
                // user:   user,
                userID:   user.userID,
                firstName:   user.firstName,
                lastName:   user.lastName,
                email:   user.email,
                updatedBy:  user.updatedBy,
                admin:  user.admin,
                active:  user.active,
                recordAdded: true,
                message:    "User successfully created.",
                sessionToken:   token
            });
        },
        createError = (err) => {
            console.log("user-controller post /register createError err", err);
            res.status(500).json({recordAdded: false, message: "User not successfully registered.", error: err});
        })
    .catch(err => {
        console.log("user-controller post /register err", err);
        res.status(500).json({recordAdded: false, message: "User not successfully registered.", error: err});
    })
});

/* ***********************************
 *** User Login **********************
*********************************** */
router.post("/login", (req, res) => {

    const query = {where: {
        [Op.and]: [
        {email: {[Op.eq]: req.body.user.email}},
        {active: {[Op.eq]: true}}
        ]
    }};

    User.findOne(query)
    .then(
        loginSuccess = (user) => {
            if (user) {
                bcrypt.compare(req.body.user.password, user.password, (err, matches) => {
                    if (matches) {
                        let token = jwt.sign({userID: user.userID}, process.env.JWT_SECRET, {expiresIn: "1d"});
                        res.status(200).json({
                            // Need to return all the properties of the user to the browser?
                            // user:   user,
                            userID:   user.userID,
                            firstName:   user.firstName,
                            lastName:   user.lastName,
                            email:   user.email,
                            updatedBy:  user.updatedBy,
                            admin:  user.admin,
                            active:  user.active,
                            message:    "Successfully authenticated user.",
                            sessionToken:   token
                        });
                    } else {
                        console.log("user-controller post /login Login failed. 401");
                        res.status(401).json({error: "Login failed."});
                    };
                })
            } else {
                // console.log("user-controller post /login Failed to authenticate. 401");
                res.status(401).json({error: "Failed to authenticate."});
            };
        },
        err => {
            console.log("user-controller post /login Failed to process. 501 err", err);
            res.status(501).send({error: "Failed to process."})
        }
    )
    .catch(err => {
        console.log("user-controller post /login err", err);
        res.status(500).json({error: err});
    })
});

/******************************
 ***** Get Users *****
 ******************************/
// Allows an admin to view all the users
router.get("/admin", validateAdmin, (req, res) => {

    const orderBy = {order: 
        [["lastName", "DESC"], ["firstName", "DESC"]]
    };
    
    User.findAll(orderBy)
      .then((users) => {
        if (users.length > 0) {
            // console.log("user-controller get /admin users", users);
            res.status(200).json({users: users, resultsFound: true, message: "Successfully retrieved users."});
        } else {
            // console.log("user-controller get /admin No Results");
            // res.status(200).send("No users found.");
            // res.status(200).send({resultsFound: false, message: "No users found."})
            res.status(200).json({resultsFound: false, message: "No users found."});
        };
    })
      .catch((err) => {
        console.log("user-controller get /admin err", err);
        res.status(500).json({resultsFound: false, message: "No users found.", error: err});
    });

});
  
/********************************
 ***** Get User By UserID *******
*******************************/
// Returns User information for the logged in user
router.get("/", validateSession, (req, res) => {

    const query = {where: {
        userID: {[Op.eq]: req.user.userID}
    }};

    // User.findOne(query)
    User.findAll(query)
    .then((users) => {
        if (users.length > 0) {
            // console.log("user-controller get / user", user);
            res.status(200).json({users: users, resultsFound: true, message: "Successfully retrieved users."});
            // res.status(200).json({
            //     // Need to return all the properties of the user to the browser?
            //     // user:   user,
            //     userID:   user.userID,
            //     firstName:   user.firstName,
            //     lastName:   user.lastName,
            //     email:   user.email,
            //     updatedBy:  user.updatedBy,
            //     admin:  user.admin,
            //     active:  user.active,
            //     message:    "Successfully retrieved user information."
            // });
        } else {
            // console.log("user-controller get / No Results");
            // res.status(200).send("No users found.");
            // res.status(200).send({resultsFound: false, message: "No users found."})
            res.status(200).json({resultsFound: false, message: "No users found."});
        };
    })
        .catch((err) => {
            console.log("user-controller get / err", err);
            res.status(500).json({resultsFound: false, message: "No users found.", error: err});
        });

});

/********************************
 ***** Get User By UserID *******
*******************************/
// Returns User information for the admin
router.get("/:userID", validateAdmin, (req, res) => {

    const query = {where: {
        userID: {[Op.eq]: req.params.userID}
    }};

    // User.findOne(query)
    User.findAll(query)
    .then((users) => {
        if (users.length > 0) {
            // console.log("user-controller get /:userID user", user);
            res.status(200).json({users: users, resultsFound: true, message: "Successfully retrieved users."});
            // res.status(200).json({
            //     // Need to return all the properties of the user to the browser?
            //     // user:   user,
            //     userID:   user.userID,
            //     firstName:   user.firstName,
            //     lastName:   user.lastName,
            //     email:   user.email,
            //     updatedBy:  user.updatedBy,
            //     admin:  user.admin,
            //     active:  user.active,
            //     message:    "Successfully retrieved user information."
            // });
        } else {
            // console.log("user-controller get /:userID No Results");
            // res.status(200).send("No users found.");
            // res.status(200).send({resultsFound: false, message: "No users found."})
            res.status(200).json({resultsFound: false, message: "No users found."});
        };
    })
        .catch((err) => {
            console.log("user-controller get /:userID err", err);
            res.status(500).json({resultsFound: false, message: "No users found.", error: err});
        });

});

/***************************
 ******* Update User *******
 ***************************/
// Allows an admin to update the user data including soft delete it
// The admin column is not included here as an extra security feature
router.put("/:userID", validateAdmin, (req, res) => {

    const updateUser = {
        firstName:  req.body.user.firstName,
        lastName:   req.body.user.lastName,
        email:      req.body.user.email,
        password:   bcrypt.hashSync(req.body.user.password),
        updatedBy:  req.user.userID,
        active:     req.body.user.active
      };

    const query = {where: {
        userID: {[Op.eq]: req.params.userID}
    }};

    User.update(updateUser, query)
    // Doesn't return the values of the updated record; the value passed to the function is the number of records updated.
    .then((user) => {
        if (user > 0) {
            res.status(200).json({
            // Need to return all the properties of the user to the browser?
            // user:   user,
            userID:   user.userID,
            firstName:   user.firstName,
            lastName:   user.lastName,
            email:   user.email,
            updatedBy:  user.updatedBy,
            admin:  user.admin,
            active:  user.active,
            recordUpdated: true,
            message: user + " user record(s) successfully updated."
            });
        } else {
            res.status(200).json({recordUpdated: false, message: user + " user record(s) successfully updated."});
        };
    })
    .catch((err) => {
        console.log("user-controller put /:userID err", err);
        res.status(500).json({recordUpdated: false, message: "User not successfully updated.", error: err});
    });

  });

/***************************
 ******* Update User *******
 ***************************/
// Allows a user to update their own record including soft delete it
// The admin column is not included here as an extra security feature
router.put("/", validateSession, (req, res) => {

    const updateUser = {
        firstName:  req.body.user.firstName,
        lastName:   req.body.user.lastName,
        email:      req.body.user.email,
        password:   bcrypt.hashSync(req.body.user.password),
        updatedBy:  req.user.userID,
        active:     req.body.user.active
      };

    const query = {where: {
        userID: {[Op.eq]: req.user.userID}
    }};

    User.update(updateUser, query)
    .then(
        createSuccess = (user) => {
            if (user > 0) {
                let token = jwt.sign({userID: user.userID}, process.env.JWT_SECRET, {expiresIn: "1d"});
                res.json({
                    // Need to return all the properties of the user to the browser?
                    // user:   user,
                    userID:   user.userID,
                    firstName:   user.firstName,
                    lastName:   user.lastName,
                    email:   user.email,
                    updatedBy:  user.updatedBy,
                    admin:  user.admin,
                    active:  user.active,
                    recordUpdated: true,
                    message: user + " user record(s) successfully updated.",
                    sessionToken:   token
                });
            } else {
                res.status(200).json({recordUpdated: false, message: user + " user record(s) successfully updated."});
            };
        },
        createError = (err) => {
            console.log("user-controller put err", err);
            res.status(500).json({recordUpdated: false, message: "User not successfully updated.", error: err});
        }
    )
    .catch((err) => {
        console.log("user-controller put err", err);
        res.status(500).json({recordUpdated: false, message: "User not successfully updated.", error: err});
    });

  });

/***************************
 ******* Delete User *******
 ***************************/
// Allows an admin to hard delete a user
router.delete("/:userID", validateAdmin, (req, res) => {

    const query = {where: {
        userID: {[Op.eq]: req.params.userID}
    }};

    User.destroy(query)
    .then(() => res.status(200).json({recordDeleted: true, message: "User successfully deleted."}))
    .catch((err) => {
        console.log("user-controller delete /:userID err", err);
        res.status(500).json({recordDeleted: false, message: "User not successfully deleted.", error: err});
    });

  });

module.exports = router;