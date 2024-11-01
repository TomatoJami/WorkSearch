const offices = require('../controllers/officeController')
const router = require('express').Router()
const authJwt = require("../middleware/authJwt")

module.exports = app => {

    /**
     * @swagger
     * tags:
     *   name: offices
     *   description: Office management endpoints
     */

    router.use(authJwt.verifyToken);

    router.get('/offices/', [authJwt.verifyToken], offices.findAll)

    router.get('/offices/:id', [authJwt.verifyToken], offices.findById)

    router.put('/offices/:id', [authJwt.verifyToken, authJwt.isAdministrator], offices.update)

    router.delete('/offices/:id', [authJwt.verifyToken, authJwt.isAdministrator], offices.delete)

    app.use('', router)
}