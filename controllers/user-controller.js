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
                message:    "User successfully created.",
                sessionToken:   token
            });
        },
        createError = (err) => res.status(500).json(err)
    )
    .catch(err => {
        console.log("user-controller post /register err", err);
        res.status(500).json({error: err});
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
                        res.status(401).json({error: "Login failed."});
                    };
                })
            } else {
                res.status(401).json({error: "Failed to authenticate."});
            };
        },
        err => res.status(501).send({error: "Failed to process."})
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
        // console.log("user-controller get /admin users", users);
        res.status(200).json({users: users, message: "Successfully retrieved users."});
    })
      .catch((err) => {
        console.log("user-controller get /admin err", err);
        res.status(500).json({error: err});
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

    User.findOne(query)
    .then((user) => res.status(200).json({
            // Need to return all the properties of the user to the browser?
            // user:   user,
            userID:   user.userID,
            firstName:   user.firstName,
            lastName:   user.lastName,
            email:   user.email,
            updatedBy:  user.updatedBy,
            admin:  user.admin,
            active:  user.active,
            message:    "Successfully retrieved user information."
        }))
        .catch((err) => {
            console.log("user-controller get / err", err);
            res.status(500).json({error: err});
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

    User.findOne(query)
    .then((user) => res.status(200).json({
            // Need to return all the properties of the user to the browser?
            // user:   user,
            userID:   user.userID,
            firstName:   user.firstName,
            lastName:   user.lastName,
            email:   user.email,
            updatedBy:  user.updatedBy,
            admin:  user.admin,
            active:  user.active,
            message:    "Successfully retrieved user information."
        }))
        .catch((err) => {
            console.log("user-controller get /:userID err", err);
            res.status(500).json({error: err});
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
    .then((user) => res.status(200).json({
        // Need to return all the properties of the user to the browser?
        // user:   user,
        userID:   user.userID,
        firstName:   user.firstName,
        lastName:   user.lastName,
        email:   user.email,
        updatedBy:  user.updatedBy,
        admin:  user.admin,
        active:  user.active,
        message:    "User successfully updated."
    }))
    .catch((err) => {
        console.log("user-controller put /:userID err", err);
        res.status(500).json({error: err});
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
                message:    "User successfully updated.",
                sessionToken:   token
            });
        },
        createError = (err) => res.status(500).json(err)
    )
    .catch((err) => {
        console.log("user-controller put err", err);
        res.status(500).json({error: err});
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
    .then(() => res.status(200).send("User successfully deleted."))
    .catch((err) => {
        console.log("user-controller delete /:userID err", err);
        res.status(500).json({error: err});
    });

  });

module.exports = router;