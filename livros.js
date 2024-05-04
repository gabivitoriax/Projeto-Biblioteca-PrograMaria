const express = require("express")
const conectaBancoDeDados = require('./bancoDeDados.js')
const cors = require('cors')
const router = express.Router()
const app = express()
const Livro = require('./livroModel.js')

conectaBancoDeDados()
app.use(cors())
app.use(express.json())

const PORTA = 4444

// GET
async function mostraLivros(request, response) {
    try {
        const livrosVindosDoBancoDeDados = await Livro.find()
        response.status(200).json(livrosVindosDoBancoDeDados)
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
        const livroEncontrado = await Livro.findById({_id: request.params.id})

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
        
        response.json({message: 'Livro deletado com sucesso'})
    } catch(erro) {
        console.log(erro)
    }
}

//ROTAS
app.use(router.get('/livros', mostraLivros))
app.use(router.post('/livros', criaLivros))
app.use(router.patch('/livros/:id', corrigeLivro))
app.use(router.delete('/livros', deletaLivro))

function mostraPorta() {
    console.log(`Servidor criado e rodadno na porta', ${PORTA}`)
}

app.listen(PORTA, mostraPorta)