const users = require('../controllers/userController')
const router = require('express').Router()
const authJwt = require("../middleware/authJwt")

module.exports = app => {
    router.post('/signup', users.signup)

    router.post('/signin', users.signin)

    router.use(authJwt.verifyToken);

    router.get('/', [authJwt.verifyToken, authJwt.isAdministrator], users.findAll)

    router.get('/:id', [authJwt.verifyToken, authJwt.checkUserId], users.findById)

    router.put('/:id', [authJwt.verifyToken, authJwt.checkUserId], users.update)

    router.delete('/:id', [authJwt.verifyToken, authJwt.checkUserId], users.delete)

    app.use('/users', router)
}