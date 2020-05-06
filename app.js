// Carregando módulos
const express = require("express")
const handlebars = require("express-handlebars")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const admin = require('./routes/admin')

const app = express()

// Configurações
app.use(bodyParser.urlencoded({
    extended:true
}))
app.use(bodyParser.json())

app.engine('handlebars', handlebars({
    defaultLayout: 'main'
}))
app.set('view engine', 'handlebars')

// Rotas

app.use('/admin', admin)

// Outros

const PORT = 8080
app.listen(PORT, () => {
    console.log("The server is running on URL http://localhost:"+PORT)
})


