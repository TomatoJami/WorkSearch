const { Sequelize } = require('sequelize')
const db = require('../config/database')
const bcrypt = require('bcrypt')

const User = db.define('User', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    username: {
        type: Sequelize.STRING(50),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Username is required'
            },
            len: {
                args: [2, 50],
                msg: 'Username must be between 2 and 50'
            }
        }
    },

    firstname: {
        type: Sequelize.STRING(50),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Firstname is required'
            },
            len: {
                args: [2, 50],
                msg: 'Firstname must be between 2 and 50'
            }
        }
    },

    lastname: {
        type: Sequelize.STRING(50),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Lastname is required'
            },
            len: {
                args: [2, 50],
                msg: 'Lastname must be between 2 and 50'
            }
        }
    },

    email: {
        type: Sequelize.STRING(255),
        allownull: false,
        unique: false,
        validate: {
            isEmail: true,
            len: {
                args: [2, 255],
                msg: 'Email must be between 2 and 255'
            }
        }
    },

    password: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    
}, {
    timestamps: false,
    tableName: 'users',
    hooks: {
        beforeCreate: async (user) => {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt)
        },
        beforeUpdate: async (user) => {
            if (user.changed('password')) {
                const salt = await bcrypt.genSalt(10)
                user.password = await bcrypt.hash(user.password, salt)
            }
        }
    }
})

module.exports = User;