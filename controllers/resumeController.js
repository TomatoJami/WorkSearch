const { Resume } = require('../models');
const generateCRUDControllers = require('./generateCRUDcontrollers');

const resumeCRUDControllers = generateCRUDControllers(Resume);

const resumeController = {
    ...resumeCRUDControllers,
    addResume: async (req, res) => {
        try {
            const resume = await Resume.create({
                userId: req.userId,
                vacancyId: req.body.vacancyId,
                CV: req.body.CV,
            });
    
            res.send('Resume added successfully');
    
        } catch (err) {
            res.status(500).send({ message: err.message });
        }
    }
};

module.exports = resumeController;