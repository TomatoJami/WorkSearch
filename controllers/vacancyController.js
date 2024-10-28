const { Vacancy } = require('../models');
const generateCRUDControllers = require('./generateCRUDcontrollers');

const vacancyCRUDControllers = generateCRUDControllers(Vacancy);

const vacancyController = {
    ...vacancyCRUDControllers
};

module.exports = vacancyController;