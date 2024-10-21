const { Sequelize } = require('sequelize')
const db = require('../config/database')

const Vacancy = db.define('Vacancy', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
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

    profession_id: {
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
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            isInt: true,
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