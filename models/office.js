const { Sequelize } = require('sequelize')
const db = require('../config/database')

const Office = db.define('Office', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    companyId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'companies',
            key: 'id'
        }
    },

    name: {
        type: Sequelize.STRING(50),
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

    location: {
        type: Sequelize.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Location is required'
            },
            len: {
                args: [2, 100],
                msg: 'Location must be between 2 and 100'
            }
        }
    }
}, {
    timestamps: false,
    tableName: 'offices',
})

module.exports = Office;