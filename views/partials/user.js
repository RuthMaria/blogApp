const mongoose = require ("../connectingBank/connectingMongo.js")
const Schema = mongoose.Schema;

// define a estrutura da tabela
const userSchema = new Schema({
    name: {
        type: String,
        require: true
    },

    email: {
        type: String,
        require: true
    },

    country: {
        type: String,
        require: true
    },

    cellphone: {
        type: String,
        require:true
    },
    
    dateBirth: {
        type: String,
        require: true
    }
})

// dá um nome para a tabela
mongoose.model("users", userSchema)

// cria uma referencia a tabela
const newUser = mongoose.model("users")

// insere dados na tabela users
new newUser ({
    name: "Ruth Maria",
    email: "ruthmariia01@gmail.com",
    country: "Brazil",
    cellphone: "(82)98831-3175",
    dateBirth: "01/05/1991"

}).save().then(() => {
    console.log("User created with sucess")

}).catch((err) => {
    console.log("Error register the user: "+err)
})
