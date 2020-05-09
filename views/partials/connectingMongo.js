// Congigurando o mongoose
const mongoose = require("mongoose")

mongoose.Promise = global.Promise
/*
Conectando com o banco de dados
Na URL de conexão informar o nome do servidor e o do banco
 */
mongoose.connect("mongodb://localhost/contacts", {
    useNewUrlParser: true,
    useUnifiedTopology: true 
}).then(() => {
    console.log("MongoDB conected ...")
    
}).catch((err) => {
    console.log("Error connecting to mongoDB "+err)
})

module.exports = mongoose