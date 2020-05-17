const mongoose = require('mongoose')
const Schema = mongoose.Schema

const user = new Schema({
    name:{
        type: String,
        required:true
    },

    email: {
        type: String,
        required:true,
        unique:true
    },

    itsAdmin:{
        type: Number,
        default:0
    },

    password: {
        type: String,
        required: true
    }
})

mongoose.model('users', user)