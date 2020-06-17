const Sequelize = require('sequelize')

const db = {}

const sequelizeDB = new Sequelize('app_development', 'root', 'faesa123', { //nomde do DataBase - usuário - senha
    host: 'localhost',
    port: 3336,
    dialect: 'mysql', // indica qual o banco de dados
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
})

db.sequelize = sequelizeDB
db.Sequelize = Sequelize

db.pacientes = require('../models/paciente')(sequelizeDB, Sequelize)

module.exports = db