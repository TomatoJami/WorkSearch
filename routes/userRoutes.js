const users = require('../controllers/userController')
const router = require('express').Router()
const authJwt = require("../middleware/authJwt")

module.exports = app => {

    /**
     * @swagger
     * tags:
     *   name: users
     *   description: Office management endpoints
     */

    router.post('/users/signup', users.signup)

    router.post('/users/signin', users.signin)

    router.use(authJwt.verifyToken)

    router.get('/users/username/:username', [authJwt.verifyToken, authJwt.checkUserId], users.findByUsername)

    router.get('/users/', [authJwt.verifyToken, authJwt.isAdministrator], users.findAll)

    router.get('/users/:id', [authJwt.verifyToken, authJwt.checkUserId], users.findById)

    router.put('/users/:id', [authJwt.verifyToken, authJwt.checkUserId], users.update)

    router.delete('/users/:id', [authJwt.verifyToken, authJwt.checkUserId], users.delete)

    app.use('', router)
}