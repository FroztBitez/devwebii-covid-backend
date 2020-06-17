const db = require('../database/db')
const Pacientes = db.pacientes
const Op = db.Sequelize.Op

const faker = require('faker')
faker.locale = 'pt-br'

function populate(){
    let fakerValues = []

    for(let i=0;i<10;i++){

        let arrayprob_saude = ["Lindo e Saudavel","Dengoso","Viro Influencer (influenza VAIRUS)","Gripe","CORONA VAIRUS"]
        let prob_saude = arrayprob_saude[Math.floor(Math.random() * arrayprob_saude.length)];

        fakerValues.push([faker.name.findName(), faker.address.country(), 
            faker.address.city(), faker.address.streetName(), 
            faker.phone.phoneNumber(), faker.random.number(), faker.random.number(), prob_saude
        ])
        
        return fakerValues
    }
}


exports.cadastrarPaciente = (req, res) =>{
    if(!req.body.nome){
        res.status(400).send({
            message: "Dados do paciente não podem ser nulos"
        })
        return
    }
    const paciente = {
        nome: req.body.nome,
        estado: req.body.estado,
        cidade: req.body.cidade,
        endereco: req.body.endereco,
        telefone: req.body.telefone,
        altura: req.body.altura,
        peso: req.body.peso,
        prob_saude: req.body.prob_saude,
    }
    Pacientes.create(paciente)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocorreu algum erro!"
            })
        })
}

exports.selecionarPaciente = (req, res) =>{
    const nome = req.body.nome
    let cond = nome ? {nome:{[Op.like]: `%${nome}%`}} : null

    Pacientes.findAll({where: cond})
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocorreu algum erro ao recuperar os pacientes!"
            })
        })
}

exports.selecionarPacienteID = (req, res) =>{
    const id = req.params.id

    Pacientes.findByPk(id)
        .then(data => {
            res.send(data)
        })
        .catch(err =>{
            res.status(500).send({
                message: err.message || `Ocorreu um erro ao recuperar o paciente de id ${id}`
            })
        })
}

exports.atualizarPaciente = (req, res) =>{
    const id = req.params.id

    Pacientes.update(req.body, {where: {id: id}})
        .then(num_linhas => {
            if(num_linhas == 1){
                res.send({
                    message: "Paciente atualizado com sucesso!"
                })
            }else{
                res.send({
                    message: `Não foi possível atualizar o paciente de id ${id}`
                })
            }
        })
        .catch(err => {
            res.send({
                message: err.message || `Ocorreu um erro ao atualziar o paciente de id ${id}`
            })
        })
}

exports.deletarPaciente = (req, res) =>{
    const id = req.params.id

    Pacientes.destroy({where: {id: id}})
        .then(num_linhas =>{
            if(num_linhas == 1){
                res.send({
                    message: "Paciente deletado com sucesso!"
                })
            }else{
                res.send({
                    message: `Não foi possível deletar o paciente de id ${id}`
                })
            }
        })
        .catch(err =>{
            res.send({
                message: err.message || `Ocorreu um erro ao atualziar o paciente de id ${id}`
            })
        })
}

exports.deletarTodosPacientes = (req, res) =>{
    Pacientes.destroy({
        where: {},
        truncate: false
    }).then(num_linhas =>{
        res.send({
            message: `${num_linhas} pacientes deletados com sucesso!`
        })
    })
    .catch(err =>{
        res.send({
            message: err.message || `Ocorreu um erro ao deletar todos os pacientes`
        })
    })
}