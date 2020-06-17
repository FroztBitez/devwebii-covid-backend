const Sequelize = require('sequelize')

module.exports = (sequelize, Sequelize) =>{
    const Paciente = sequelize.define(//define = cria a tabela
        'paciente',{
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            nome: {
                type: Sequelize.STRING
            },
            estado: {
                type: Sequelize.STRING
            },
            cidade: {
                type: Sequelize.STRING
            },
            endereco: {
                type: Sequelize.STRING
            },
            telefone: {
                type: Sequelize.STRING
            },
            altura: {
                type: Sequelize.FLOAT
            },
            peso: {
                type: Sequelize.DOUBLE
            },
            prob_saude: {
                type: Sequelize.STRING
            }
        },
        {
            timestamps: false //tempo de criação, "eu não quero guardar o tempo de criação desse objeto"
        }
    )

    return Paciente
}