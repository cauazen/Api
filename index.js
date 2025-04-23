const express = require('express') //importar modulo express do npm

const app = express() // inicializa o servidor express e salva na variável app
const PORT = 8000 // separa uma porta para rodar o servidor
app.use(express.json())//fala para o servidor que vai receber dados em JSON

const BancoDeDados = [
    {
        id:1,
        titulo:"Desenvolvimento de sistemas",
        curso:"Técnico em desenvolvimento de sistemas",
        turma:"3B",
        professor: "Ramon"
    }
]
// criar as minhas rotas
app.get('/aulas', (req,res)=>{
    res.status(200).send(BancoDeDados)
})

app.get('/aulas/:id', (req,res)=>{
    console.log(req.params.id)
    //fazer uma busca no array BancoDeDados, pelo id recebido
    res.send('qualquer coisa')
})

app.post('/aulas', (req,res)=>{
    const dados = req.body
    dados['id'] = BancoDeDados.length + 1
    BancoDeDados.push(dados)
    res.status(201).send(dados)
})

app.put('/aulas/:id', (req, res)=> {
    //pegar id da rota
    const id = req.params.id
    console.log(id)
    //procurar o id no array
    const usuario = BancoDeDados.find(user => user.id == id)
    if(!usuario){
        res.status(404).json({msg:"Usuário não encontrado"})
    }
    //modificar os campos
    //atualizar o array
    res.send('ok')

})

app.delete('/aulas/:id', (req,res)=>{
    const id = req.params.id
    console.log(id)
    //procurar o id no array
    const userIndex = BancoDeDados.findIndex(user => user.id == id)
    if(!userIndex === -1){
        res.status(404).json({msg:"Usuário não encontrado"})
    }
    BancoDeDados.splice(userIndex,1)
    res.status(204).send()

})

app.listen(PORT, ()=> {console.log('Servidor online')}) // bota o servidor para ouvir requisições 
