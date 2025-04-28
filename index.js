const express = require('express') //importar modulo express do npm
const fs = require('fs')

const app = express() // inicializa o servidor express e salva na variável app
const PORT = 8000 // separa uma porta para rodar o servidor
app.use(express.json())//fala para o servidor que vai receber dados em JSON

// criar as minhas rotas

app.get('./aulas', (req,res)=> {
    fs.readFile('bancoDeDados.json', 'utf-8', (err,data)=>{
        if(err){
            res.status(500).json({msg:"erro no servidor"})
        }
        const dados = JSON.parse(data)
        res.status(200).json(dados)
    })
})

app.get('/aulas/:id', (req,res)=>{ //procurar um usupario pelo id 
    const id = req.params.id //pegando o id da url
    fs.readFile('bancoDeDados.json', 'utf-8', (err,data)=>{ //abrindo o arquivo banco de dados e lendo ele no formato utf-8
        if(err){ //testa se ouve algum erro
            res.status(500).json({msg:"erro no servidor"}) // em caso de erro devolve o codigo 500 para o usuario
        }
        const aulas = JSON.parse(data) // convertendo a informaçao do arquivo para um objeto json
        const aula = usuarios.find(aula=> aula.id == id) // procuera no array de usuarios, cada usuario, e compara seu id com o id procurado
        if(aula){
        res.status(200).json(aula) //retorna uma resposta de sucesso com este usuario
        }
        res.status(404).json({msg:'Usuario nao encontrado'}) //retorna  uma reposta de erro 404 not found
    })
})
app.post('/aulas', (req,res)=>{
    const dados = req.body
    //ler  arquivos json
    //se o arquivo não existe, cria ele e atualiza com o usuario
    fs.readFile('bancoDeDados.json', 'utf-8', (err,data)=>{ //abrindo o arquivo banco de dados e lendo ele no formato utf-8
        if(err){ //testa se ouve algum erro
            res.status(500).json({msg:"erro no servidor"}) // em caso de erro devolve o codigo 500 para o usuario
        }
        const aulas = JSON.parse(data) // convertendo a informaçao do arquivo para um objeto json
        //criar id
        dados['id'] = aulas.length + 1
        //adicionar a nova aula, no array de aulas
        aulas.push(dados)
        fs.writeFile('bancoDeDados.json', JSON.stringify(aulas),(err)=>{
            if(err){
                res.status(500).json({msg:'Erro no servidor'})
            }
            res.status(201).send(dados)
        })
    })
})

//atualizar
app.put('/aulas/:id', (req, res)=> {
    //pegar id da rota
    const id = req.params.id
    console.log(id)
    fs.readFile('bancoDeDados.json', 'utf-8', (err,data)=>{ //abrindo o arquivo banco de dados e lendo ele no formato utf-8
        if(err){ //testa se ouve algum erro
            res.status(500).json({msg:"erro no servidor"}) // em caso de erro devolve o codigo 500 para o usuario
        }
    const aulas = JSON.parse(data)
    const aulaIndex = aulas.findIndex(aula => aula.id == id)
        if(aulaIndex !== -1){
        const dados = req.body
        for(keys in dados){
            aulas[aulaIndex][key] = dados[key]
        }
        fs.writeFile('bancoDeDados.json', JSON.stringify(aulas),(err)=>{
            if(err){
                res.status(500).json({msg:'Erro no servidor'})
            }
            res.status(201).send(dados)
        })
    }
    //modificar os campos
    //atualizar o array
    res.send('ok')
    })
})

app.delete('/aulas/:id', (req,res)=>{
    const id = req.params.id
    console.log(id)
    fs.readFile('bancoDeDados.json', 'utf-8', (err,data)=>{ //abrindo o arquivo banco de dados e lendo ele no formato utf-8
        if(err){ //testa se ouve algum erro
            res.status(500).json({msg:"erro no servidor"}) // em caso de erro devolve o codigo 500 para o usuario
        }
    const aulas = JSON.parse(data)
    const aulaIndex = aulas.findIndex(aula => aula.id == id)
    if(aulaIndex === -1){
        aulas.splice(aulaIndex,1)
        fs.writeFile('bancoDeDados.json', JSON.stringify(aulas),(err)=>{
            if(err){
                res.status(500).json({msg:'Erro no servidor'})
            }
            res.status(201).send(dados)
            })
    }else{
        res.status(404).json({msg:'Erro do usuario'})
    }
        
})


app.listen(PORT, ()=> {console.log('Servidor online')}) // bota o servidor para ouvir requisições 
