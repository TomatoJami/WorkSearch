const companies = require('../controllers/companyController')
const router = require('express').Router()
const authJwt = require("../middleware/authJwt")

module.exports = app => {

    /**
     * @swagger
     * tags:
     *   name: companies
     *   description: Office management endpoints
     */

    router.use(authJwt.verifyToken);

    router.get('/companies/', [authJwt.verifyToken], companies.findAll)

    router.get('/companies/:id', [authJwt.verifyToken], companies.findById)

    router.put('/companies/:id', [authJwt.verifyToken, authJwt.isAdministrator], companies.update)

    router.delete('/companies/:id', [authJwt.verifyToken, authJwt.isAdministrator], companies.delete)

    app.use('', router)
}