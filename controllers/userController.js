const { User, Role } = require('../models');
const generateCRUDControllers = require('./generateCRUDcontrollers');
const config = require('../config/auth.js');
var jwt = require('jsonwebtoken');

const userCRUDControllers = generateCRUDControllers(User);

const userController = {
    ...userCRUDControllers,
    signin: async (req, res) => {
        try {
            const { username, password } = req.body;
            const user = User.findOne({
                where: {
                    username: username,
                    password: password
                }
            })

            if (!user) {
                return res.status(404).send({ message: 'User not found' });
            } else {
                const token = jwt.sign(
                    { id: user.id },
                    config.secret,
                    { expiresIn: 3600 } // 1 час
                )
    
                res.json({ message: 'Aunthentication successful', token })
            }

        } catch (error) {
            res.status(500).json({message: error.message})
        }
    },

    signup: async (req, res) => {
        try {
            const user = await User.create({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password
            });

            if (req.body.roles) {
                const roles = await Role.findAll({
                    where: {
                        name: {
                            [Op.or]: req.body.roles
                        }
                    }
                });
                await user.setRoles(roles);
            } else {
                // Role = user
                await user.setRoles([1]);
            }

            res.send({
                message: 'User was registered successfully'
            });
        } catch (err) {
            res.status(500).send({ message: err.message });
        }
    }
};

module.exports = userController;