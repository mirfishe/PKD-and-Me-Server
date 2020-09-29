const jwt = require('jsonwebtoken');
const User = require('../db').import('../models/user');

const validateAdmin = (req, res, next) => {

    const token = req.headers.authorization;

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        // console.log('token: ', token);
        // console.log('decoded: ', decoded);
        if (!err && decoded) {
            User.findOne({where: {
                [Op.and]: [
                {userID: {[Op.eq]: decoded.userID}},
                {admin: {[Op.eq]: true}},
                {active: {[Op.eq]: true}}
                ]
            }})
            .then(user => {
                if(!user) throw 'err';
                // Need to return all the properties of the user?
                // req.user = user;
                req.user = {userID: user.userID};
                return next();
            })
            .catch(err => next(err))
        } else {
            req.errors = err;
            return res.status(401).send('Unauthorized')
        };

    });
};

module.exports = validateAdmin;