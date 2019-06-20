const {connect} = require('./hospitaisRepository')
const hospitaisModel = require('./hospitaisSchema')

connect()

const getAll = async () =>{
    return hospitaisModel.find((error, hospitais)=>{
        return hospitais
    })
}

const getById = (id) =>{
    return hospitaisModel.findById(id)
}

const add = (hospital) => {
    const novoHospital = new hospitaisModel(hospital)
    return novoHospital.save()
}

const remove = (id)=>{
    return hospitaisModel.findByIdAndDelete(id)
}

const update = (id, hospital) =>{
    return hospitaisModel.findByIdAndUpdate(
        id, 
        { $set: hospital },
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