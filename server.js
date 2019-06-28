const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const servidor = express()
const controller = require('./SpotlightController')
const PORT = 8000

servidor.use(cors())
servidor.use(bodyParser.json())

servidor.get('/',(request, response)=>{
    response.send('Olá, mundo!')
})

servidor.get('/usuarios', async (request, response) => {
    controller.getAll()
    .then(usuarios => response.send(usuarios))
})

servidor.get('/usuarios/:id', (request, response)=>{
    const id = request.params.id
    controller.getById(id)
        .then(usuario =>{
            if(!usuario){
                response.sendStatus(404)
            }else{
                response.send(usuario
    )
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

servidor.patch('/usuarios/:id', (request, response)=>{
    const id = request.params.id
    controller.update(id, request.body)
        .then(usuario => {
            if(!usuario
){
                response.sendStatus(404)
            }else{
                response.send(usuario
    )
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

servidor.post('/usuarios', (request, response)=>{
    controller.add(request.body)
        .then(usuario =>{
            const _id = usuario._id
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

servidor.post('/usuarios/login', (request, response) => {
    SpotlightController.login(request.body)
      .then(loginResponse => {
        response.send(loginResponse)
      })
      .catch(error => {
        if(error.name === "ValidationError"){
          console.log(error)
          response.sendStatus(400)
        } else {
          console.log(error)
          response.sendStatus(500)
        }
})

servidor.delete('/usuarios/:id', (request, response)=>{
    controller.remove(request.params.id)
        .then(usuario =>{
            if(usuario
 === null || usuario
 === undefined){ // if(!comida) 
                response.sendStatus(404)
            } else {
                response.sendStatus(204)
            }
        })
        .catch(error => {
            if(error.name === "CastError"){
              response.sendStatus(400)
            } else {
              response.sendStatus(500)
            } 
          })
})

servidor.listen(PORT)
console.info(`Rodando na porta ${PORT}`)