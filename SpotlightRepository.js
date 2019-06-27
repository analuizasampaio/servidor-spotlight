const mongoose = require("mongoose");
const MONGO_URL = "mongodb://localhost:27017/spotlight";

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