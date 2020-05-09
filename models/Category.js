const mongoose = require('mongoose')
const Schema = mongoose.Schema

// define the table's struct
const Category = new Schema ({
    name: {
        type: String,
        required: true
    },

    slug: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        default: Date.now()
    }
})

// Give a name to the table
mongoose.model("categories", Category)