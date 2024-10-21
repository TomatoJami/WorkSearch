const users = require('../controllers/userController')
const router = require('express').Router()
const authJwt = require("../middleware/authJwt")

module.exports = app => {
    router.post('/signup', users.signup)

    router.post('/signin', users.signin)

    router.get('/', users.findAll, authJwt.verifyToken, authJwt.checkUserId, authJwt.isAdministrator)

    router.get('/:id', users.findById)

    router.put('/:id', users.update)

    router.delete('/:id', users.delete)

    app.use('/users', router)
}