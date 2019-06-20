const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const hospitaisSchema = new Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true},
    nomeHospital: {type: String, required: true},
    nomeUser: {type: String},
    image: {type: String},
    nota: {type: Number, required: true},
    relato: {type: String, required: true},
})

const hospitaisModel = mongoose.model("hospitais", hospitaisSchema);

module.exports = hospitaisModel