const jwt = require('jsonwebtoken');
const config = require('../config/auth.js');

const User = require('../models/user.js')

verifyToken = (req, res, next) => {
    let token = req.headers['x-access-token'];

    if (!token) {
        return res.status(403).send({
            message: 'No token provided!'
        });
    }

    jwt.verify(
        token,
        config.secret,
        (err, decoded) => {
            if (err) {
                return res.status(401).send({
                    message: 'Unauthorized'
                });
            }

            req.userId = decoded.id;
            next();
        }
    );
};

checkUserId = (req, res, next) => {
    if (req.params.id && req.userId !== parseInt(req.params.id)) {
        return res.status(403).send({
            message: "Unauthorized! You can only access your own data."
        });
    }
    next();
}

isAdministrator = (req, res, next) => {
    console.log("User ID from token:", req.userId);
    User.findByPk(req.userId).then(user => {

        if (!user) {
            return res.status(404).send({
                message: 'User Not found.'
            });
        }

        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === 'administrator') {
                    next();
                    return;
                }
            }
    
            res.status(403).send({
                message: 'Require Admin Role'
            });
            return;
        });
    });
};

const authJwt = {
    verifyToken: verifyToken,
    checkUserId: checkUserId,
    isAdministrator: isAdministrator,
}

module.exports = authJwt