const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const SpotlighSchema = new Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true},
    nome: {type: String, required: true},
    sobrenome: {type: String, required: true},
    email: {type: String, required: true},
    senha: {type: String, required: true},
    image: {type: String}
})

const spotlightModel = mongoose.model("hospitais", SpotlighSchema);

module.exports = spotlightModel