const { Sequelize } = require('sequelize')
const db = require('../config/database')

const ProfessionType = db.define('ProfessionType', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    profession: {
        type: Sequelize.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Profession is required'
            },
            len: {
                args: [2, 100],
                msg: 'Profession must be between 2 and 100'
            }
        }
    }
}, {
    timestamps: false,
    tableName: 'profession_types',
})

module.exports = ProfessionType;