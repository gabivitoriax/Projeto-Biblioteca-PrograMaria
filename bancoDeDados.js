const mongoose = require('mongoose')
require('dotenv').config()

async function conectaBancoDeDados() {
    console.log('A conexão com o banco de dados iniciou')
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log('Conexão com o banco de dados feita com sucesso!')
    } catch (erro) {
        console.log(erro)
    }
}

module.exports = conectaBancoDeDados