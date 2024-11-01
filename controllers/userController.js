const { User, Role } = require('../models');
const generateCRUDControllers = require('./generateCRUDcontrollers');
const config = require('../config/auth.js');
var jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");

const userCRUDControllers = generateCRUDControllers(User);

const userController = {
    ...userCRUDControllers,
    signin: async (req, res) => {
        try {
            const username = req.body.username;
            const user = await User.findOne({
                where: {
                    username: username
                }
            });

            const passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );
    
            if (!user) {
                return res.status(404).send({ message: 'User not found' });
            }

            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!"
                })
            }

            const token = jwt.sign(
                { id: user.id },
                config.secret,
                { expiresIn: 3600 } // 1 час
            );
    
                res.json({ message: 'Authentication successful', token });
            
    
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    signup: async (req, res) => {
        try {
            const user = await User.create({
                username: req.body.username,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
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
    },

    findByUsername: async(req, res) => {
        const username = req.params.username
        try {
            const user = await User.findOne({
                where: {
                    username: username
                }
            });

            if (username.length === 0) {
                return res.status(404).json({ message: 'No users found!' });
            }

            res.status(200).json(user);
        } catch (err) {
            res.status(500).send({ message: err.message });
        }
    }
};

module.exports = userController;