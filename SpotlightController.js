const {connect} = require('./SpotlightRepository')
const spotlightModel = require('./SpotlightSchema')

connect()

const getAll = async () =>{
    return spotlightModel.find((error, usuario)=>{
        return usuario
    })
}

const getById = (id) =>{
    return spotlightModel.findById(id)
}

const add = (usuario) => {
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