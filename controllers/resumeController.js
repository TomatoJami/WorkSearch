const { Resume } = require('../models');
const generateCRUDControllers = require('./generateCRUDcontrollers');

const resumeCRUDControllers = generateCRUDControllers(Resume);

const resumeController = {
    ...resumeCRUDControllers,
    addResume: async (req, res) => {
        try {
            const resume = await Resume.create({
                username: req.body.username,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                password: req.body.password
            })

            res.send('User added successfully')

        } catch (err) {
            res.status(500).send({ message: err.message });
        }
    }
};

module.exports = resumeController;