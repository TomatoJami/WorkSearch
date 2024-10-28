const { Office } = require('../models');
const generateCRUDControllers = require('./generateCRUDcontrollers');

const officeCRUDControllers = generateCRUDControllers(Office);

const officeController = {
    ...officeCRUDControllers
};

module.exports = officeController;