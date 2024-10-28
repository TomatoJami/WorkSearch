const companies = require('../controllers/companyController')
const router = require('express').Router()
const authJwt = require("../middleware/authJwt")

module.exports = app => {
    router.use(authJwt.verifyToken);

    router.get('/', [authJwt.verifyToken], companies.findAll)

    router.get('/:id', [authJwt.verifyToken], companies.findById)

    router.put('/:id', [authJwt.verifyToken, authJwt.isAdministrator], companies.update)

    router.delete('/:id', [authJwt.verifyToken, authJwt.isAdministrator], companies.delete)

    app.use('/companies', router)
}