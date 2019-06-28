
const {connect} = require('./SpotlightRepository')
const spotlightModel = require('./SpotlightSchema')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

connect()

const getAll = async () =>{
    return spotlightModel.find((error, usuario)=>{
        return usuario
    })
}

const getById = (id) =>{
    return spotlightModel.findById(id)
}

const add = async (usuario) => {
    const usuarioEncontrado = await spotlightModel.findOne({ email: usuario.email })
  
    if (usuarioEncontrado) {
      throw new Error('Email já cadastrado')
    }
  
    const salt = bcrypt.genSaltSync(10)
    const senhaCriptografada = bcrypt.hashSync(usuario.senha, salt)
  
    const novoUsuario = new spotlightModel(usuario)
    return novoUsuario.save()
  }

const remove = (id)=>{
    return spotlightModel.findByIdAndDelete(id)
}

const update = (id, usuario) =>{
    return spotlightModel.findByIdAndUpdate(
        id, 
        { $set: usuario },
        { new: true },
    )
}

module.exports = {
    getAll,
    getById,
    add,
    remove,
    update,
}