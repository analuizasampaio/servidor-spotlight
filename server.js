const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const servidor = express()
const controler = require('./hospitaisController')
const PORT = 3000

servidor.use(cors())
servidor.use(bodyParser.json())

servidor.get('/',(request, response)=>{
    response.send('Olá, mundo!')
})

servidor.get('/hospitais', async (request, response)=>{
    controler.getAll()
    .then(hospitais => response.send(hospitais))
})

servidor.get('/hospitais/:id', (request, response)=>{
    const hospitalId = request.params.hospitalId
    controler.getById(hospitalId)
    .then(hospital =>{
        if(!hospital){
            response.sendStatus(404)
        }else{
            response.send(hospital)
        }
    })
    .catch(error =>{
        if(error.name === "CastError"){
            response.sendStatus(400)
        }else{
            response.sendStatus(500)
        }
    })
})

servidor.listen(PORT)
console.info(`Rodando na porta ${PORT}`)