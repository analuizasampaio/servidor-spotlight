require('dotenv-safe').load()
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
    treinador.senha = senhaCriptografada

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

const login = async (loginData) => {
  const usuarioEncontrado = await spotlightModel.findOne(
    { email: loginData.email }
  )
  if (usuarioEncontrado) {
    const senhaCorreta = bcrypt.compareSync(loginData.senha, usuarioEncontrado.senha)
    if (senhaCorreta) {
      const token = jwt.sign(
        { email: usuarioEncontrado.email, id: usuarioEncontrado._id },
        process.env.PRIVATE_KEY
      )
      return { auth: true, token };
    } else {
      throw new Error('Senha incorreta, prestenção parça')
    }
  } else {
    throw new Error('Email não está cadastrado')
  }
}


module.exports = {
    getAll,
    getById,
    add,
    remove,
    update,
    login
}