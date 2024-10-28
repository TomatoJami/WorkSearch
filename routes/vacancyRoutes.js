const vacancies = require('../controllers/vacancyController')
const router = require('express').Router()
const authJwt = require("../middleware/authJwt")

module.exports = app => {
    router.use(authJwt.verifyToken);

    router.get('/', [authJwt.verifyToken], vacancies.findAll)

    router.get('/:id', [authJwt.verifyToken], vacancies.findById)

    router.put('/:id', [authJwt.verifyToken, authJwt.isAdministrator], vacancies.update)

    router.delete('/:id', [authJwt.verifyToken, authJwt.isAdministrator], vacancies.delete)

    app.use('/vacancies', router)
}