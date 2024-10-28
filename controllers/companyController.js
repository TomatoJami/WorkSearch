const { Company } = require('../models');
const generateCRUDControllers = require('./generateCRUDcontrollers');

const companyCRUDControllers = generateCRUDControllers(Company);

const companyController = {
    ...companyCRUDControllers
};

module.exports = companyController;