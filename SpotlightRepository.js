require('dotenv-safe').load()
const mongoose = require("mongoose");
const MONGO_URL = process.env.MONGODB_URI 

function connect () {
    mongoose.connect(MONGO_URL,
      { useNewUrlParser: true },
      function (error) {
        if(error) {
          console.error("Algo de errado não está certo: ", error)
        } else {
          console.log("Conectado no mongoDB! o/")
        }
      }
    );
  }
  
  module.exports = { connect }