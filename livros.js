const express = require("express")
const router = express.Router()
const conectaBancoDeDados = require('./bancoDeDados.js')
conectaBancoDeDados()

const Livro = require("./livro.js")

const app = express()
app.use(express.json())
const porta = 3333

// GET
async function mostraLivros(request, response) {
    try {
        const livrosVindosDoBancoDeDados = await Livro.find()

        response.json(livrosVindosDoBancoDeDados)
    } catch(erro) {
        console.log(erro)
    }
}

//POST
async function criaLivros(request, response) {
    const novoLivro = new Livro ({
        nome: request.body.nome,
        autor: request.body.autor,
        categoria: request.body.categoria
    })
    try {
        const livroCriado = await novoLivro.save()
        response.status(201).json(livroCriado)
    } catch(erro) {
        console.log(erro)
    }
}

//PATCH
async function corrigeLivro(request, response) {
    try {
        const livroEncontrado = await Livro.findById(request.params.id)

        if (request.body.nome) {
            livroEncontrado.nome = request.body.nome
        }

        if (request.body.autor) {
            livroEncontrado.autor = request.body.autor
        }

        if (request.body.categoria) {
            livroEncontrado.categoria = request.body.categoria
        }

        const livroAtualizadoNoBancoDeDados = await livroEncontrado.save()
        response.json(livroAtualizadoNoBancoDeDados)
    } catch(erro) {
        console.log(erro)
    }
}

//DELETE
async function deletaLivro(request, response) {
    try {
        await Livro.findByIdAndDelete(request.params.id)
        
        response.json({mensagem: 'Livro deletado com sucesso'})
    } catch(erro) {
        console.log(erro)
    }
}

app.use(router.get('/livros', mostraLivros))
app.use(router.post('/livros', criaLivros))
app.use(router.patch('/livros/:id', corrigeLivro))
app.use(router.delete('/livros', deletaLivro))
app.listen(porta, mostraPorta)

function mostraPorta() {
    console.log('Servidor criado e rodadno na porta', porta)
}