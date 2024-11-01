const { Sequelize } = require('sequelize')
const db = require('../config/database')

const Vacancy = db.define('Vacancy', {
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
                args: [2, 1000],
                msg: 'Name must be between 2 and 100'
            }
        }
    },

    officeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'offices',
            key: 'id'
        },
        validate: {
            isInt: true,
        }
    },

    professionId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'profession_types',
            key: 'id'
        },
        validate: {
            isInt: true,
        }
    },

    yearsRequiredExpirience: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            isInt: true,
        }
    },

    requiredSkills: {
        type: Sequelize.STRING(200),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Required skills is required'
            },
            len: {
                args: [2, 100],
                msg: 'Required skills must be between 2 and 200'
            }
        }
    },

    salary: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            isInt: true,
        }
    }
}, {
    tableName: 'vacancies'
})

module.exports = Vacancy;