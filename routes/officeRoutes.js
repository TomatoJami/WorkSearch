const offices = require('../controllers/officeController')
const router = require('express').Router()
const authJwt = require("../middleware/authJwt")

module.exports = app => {
    router.use(authJwt.verifyToken);

    router.get('/', [authJwt.verifyToken], offices.findAll)

    router.get('/:id', [authJwt.verifyToken], offices.findById)

    router.put('/:id', [authJwt.verifyToken, authJwt.isAdministrator], offices.update)

    router.delete('/:id', [authJwt.verifyToken, authJwt.isAdministrator], offices.delete)

    app.use('/offices', router)
}