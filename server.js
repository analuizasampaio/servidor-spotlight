const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const servidor = express()
const controller = require('./hospitaisController')
const PORT = 3000

servidor.use(cors())
servidor.use(bodyParser.json())

servidor.get('/',(request, response)=>{
    response.send('Olá, mundo!')
})

servidor.get('/hospitais', async (request, response)=>{
    controller.getAll()
    .then(hospitais => response.send(hospitais))
})

servidor.get('/hospitais/:id', (request, response)=>{
    const hospitalId = request.params.hospitalId
    controller.getById(hospitalId)
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

servidor.patch('/hospitais/:id', (request, response)=>{
    const id = request.params.id
    controller.update(id, request.body)
        .then(hospital => {
            if(!hospital){
                response.sendStatus(404)
            }else{
                response.send(hospital)
            }
        })
        .catch(error => {
            if(error.name === "MongoError" || error.name === "CastError"){
                response.sendStatus(400)
            }else{
                response.sendStatus(500)
            }
        })
})

servidor.post('/hospitais', (request, response)=>{
    controller.add(request.body)
        .then(hospital =>{
            const _id = hospital._id
            response.send(_id)
        })
        .catch(error =>{
            if(error.name === "ValidationError"){
                response.sendStatus(400)
            }else{
                response.sendStatus(500)
            }
        })
})

servidor.listen(PORT)
console.info(`Rodando na porta ${PORT}`)