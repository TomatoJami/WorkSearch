const { Sequelize } = require('sequelize')
const db = require('../config/database')

const Company = db.define('Company', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    name: {
        type: Sequelize.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Name is required'
            },
            len: {
                args: [2, 100],
                msg: 'Name must be between 2 and 100'
            }
        }
    },

    industry: {
        type: Sequelize.STRING(50),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Industry is required'
            },
            len: {
                args: [2, 50],
                msg: 'Name must be between 2 and 50'
            }
        }
    },

    description: {
        type: Sequelize.STRING(1000),
        allowNull: true
    }
}, {
    timestamps: false,
    tableName: 'companies',
})

module.exports = Company;