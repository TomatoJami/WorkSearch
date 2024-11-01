const vacancies = require('../controllers/vacancyController')
const router = require('express').Router()
const authJwt = require("../middleware/authJwt")

module.exports = app => {

    /**
     * @swagger
     * tags:
     *   name: vacancies
     *   description: Office management endpoints
     */

    router.use(authJwt.verifyToken);

    router.get('/vacancies/', [authJwt.verifyToken], vacancies.findAll)

    router.get('/vacancies/location/:location', [authJwt.verifyToken], vacancies.findByName)

    router.get('/vacancies/name/:name', [authJwt.verifyToken], vacancies.findByName)

    router.get('/vacancies/:id', [authJwt.verifyToken], vacancies.findById)

    router.put('/vacancies/:id', [authJwt.verifyToken, authJwt.isAdministrator], vacancies.update)

    router.delete('/vacancies/:id', [authJwt.verifyToken, authJwt.isAdministrator], vacancies.delete)

    app.use('', router)
}