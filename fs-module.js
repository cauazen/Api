const fs = require('fs')

//ler arquivo
//fs.readFile('./teste.txt', 'utf-8', (err,data)=>{
 //   console.log(data)
//})


//escrever um arquivo
const texto = 'teste 1234'
//append adiciona 
//write substitui
fs.writeFile('./texto.txt', texto, (err)=>{
    console.log(err)
})