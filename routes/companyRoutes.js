const users = require('../controllers/userController')
const router = require('express').Router()
const authJwt = require("../middleware/authJwt")

module.exports = app => {
    router.use(authJwt.verifyToken);

    router.get('/', [authJwt.verifyToken], users.findAll)

    router.get('/:id', [authJwt.verifyToken], users.findById)

    router.put('/:id', [authJwt.verifyToken, authJwt.isAdministrator], users.update)

    router.delete('/:id', [authJwt.verifyToken, authJwt.isAdministrator], users.delete)

    app.use('/companies', router)
}