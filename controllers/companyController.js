const { User, Role } = require('../models');
const generateCRUDControllers = require('./generateCRUDcontrollers');
const config = require('../config/auth.js');
var jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");

const userCRUDControllers = generateCRUDControllers(User);

const userController = {
    ...userCRUDControllers
};

module.exports = userController;