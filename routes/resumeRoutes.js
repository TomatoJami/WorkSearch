const resumes = require('../controllers/resumeController')
const router = require('express').Router()
const authJwt = require("../middleware/authJwt")

module.exports = app => {
    router.use(authJwt.verifyToken);

    router.post('/addResume', [authJwt.verifyToken], resumes.addResume)

    router.get('/', [authJwt.verifyToken], resumes.findAll)

    router.get('/:id', [authJwt.verifyToken], resumes.findById)

    router.put('/:id', [authJwt.verifyToken, authJwt.isAdministrator], resumes.update)

    router.delete('/:id', [authJwt.verifyToken, authJwt.isAdministrator], resumes.delete)

    app.use('/resumes', router)
}