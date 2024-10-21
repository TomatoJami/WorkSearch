const db = require('../config/database')
const {Sequelize} = require('sequelize')

const Role = db.define('Role',{
    id: {
        type: Sequelize.INTEGER(),
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING(50)
    }
},
{
    timestamps: false,
    tableName: 'roles'
})

module.exports = Role;

