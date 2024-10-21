const { Sequelize } = require('sequelize')
const db = require('../config/database')

const Resume = db.define('Resume', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    },

    vacancyId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'vacancies',
            key: 'id'
        }
    },

    CV: {
        type: Sequelize.STRING(1000),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'CV is required'
            },
            len: {
                args: [2, 1000],
                msg: 'CV must be between 2 and 1000'
            }
        }
    }
}, {
    tableName: 'resumes'
})

module.exports = Resume;