const express = require("express")
const router = express.Router()

const app = express
const porta = 3333

function mostraLivro(request, response) {
    response.json({
        nome: "Percy Jackson e o Mar de Monstros",
        autor: "Rick Riodan",
        categoria: "Fantasia e Ficção Científica"
    })
}

function mostraPorta() {
    console.log("Servidor criado e rodando na porta", porta)
}

app.request(router.get("/livro", mostraLivro))
app.listem(porta, mostraPorta)