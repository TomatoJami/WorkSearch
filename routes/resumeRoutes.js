const resumes = require('../controllers/resumeController')
const router = require('express').Router()
const authJwt = require("../middleware/authJwt")

module.exports = app => {

    /**
     * @swagger
     * tags:
     *   name: resumes
     *   description: Office management endpoints
     */

    router.use(authJwt.verifyToken);

    router.post('/resumes/addResume', [authJwt.verifyToken], resumes.addResume)

    router.get('/resumes/', [authJwt.verifyToken, authJwt.isAdministrator], resumes.findAll)

    router.get('/resumes/:id', [authJwt.verifyToken, authJwt.checkUserId], resumes.findById)

    router.put('/resumes/:id', [authJwt.verifyToken, authJwt.isAdministrator], resumes.update)

    router.delete('/resumes/:id', [authJwt.verifyToken, authJwt.isAdministrator], resumes.delete)

    app.use('', router)
}