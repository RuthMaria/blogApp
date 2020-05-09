// Loading modules
const express = require("express")
const handlebars = require("express-handlebars")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const admin = require('./routes/admin')
const path = require('path')   // works with directories and folders
const session = require('express-session')
const flash = require('connect-flash')
const app = express()

// Settings

app.use(session({
    secret: 'aprendendonodejs',
    resave: true,
    saveUninitialized: true
}))

app.use(flash())

app.use((request, response, next) => {
    response.locals.success_msg = request.flash('success_msg')
    response.locals.error_msg = request.flash('error_msg')
    next()
})

app.use(bodyParser.urlencoded({
    extended:true
}))
app.use(bodyParser.json())

app.engine('handlebars', handlebars({
    defaultLayout: 'main'
}))
app.set('view engine', 'handlebars')

mongoose.Promise = global.Promise

mongoose.connect('mongodb://localhost/blogapp', {
    useNewUrlParser: true,
    useUnifiedTopology: true 
}).then(() => {
    console.log("MongoDB conected ...")
    
}).catch((err) => {
    console.log("Error connecting to mongoDB "+err)
})

// Public
app.use(express.static(path.join(__dirname, "public")))

// Routes

app.use('/admin', admin)

// Others

const PORT = 8080
app.listen(PORT, () => {
    console.log("The server is running on URL http://localhost:"+PORT)
})


