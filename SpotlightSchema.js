const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const SpotlighSchema = new Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true},
    nome: {type: String, required: true},
    sobrenome: {type: String, required: true},
    email: {type: String, required: true},
    senha: {type: String, required: true},
    image: {type: String},
    hospital: {type: String},
    endereco: {type: String},
    pontuacao: {type: Number},
    nota: {type: Number},
    relato: {type:String}

})

const spotlightModel = mongoose.model("spotlight", SpotlighSchema);

module.exports = spotlightModel