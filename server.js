const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const servidor = express()
const controler = require('./hospitaisController')
const PORT = 3000

servidor.use(cors())
servidor.use(bodyParser.json())

