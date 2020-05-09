const express = require('express')
const router = express.Router() // used to create routes in separate files

const mongoose = require('mongoose')
require('../models/Category')
const Category = mongoose.model('categories') //created a reference the table

router.get('/', (request, response) => {
    response.render("admin/index")
})

router.get('/posts', (request, response) => {
    response.send('Page of posts')
})

router.get('/categories', (request, response) => {
    response.render('admin/categories')
})

router.get('/categories/add', (request, response) => {
    response.render('admin/addcategories')
})

router.post('/categories/new', (request, response) => {
    
    var error = []

    if (!request.body.name || typeof request.body.name == undefined || request.body.name == null) {
        error.push({texto: 'invalid name'})
    }

    if (!request.body.slug || typeof request.body.slug == undefined || request.body.slug == null) {
        error.push({texto: 'invalid slug'})
    }

    if (request.body.name.length < 2) {
        error.push({texto: 'name of the category is very small'})    
    }

    if (error.length > 0) {
        response.render('admin/addcategories', {error: error})        
    }

    const newCategory = {
        name: request.body.name,
        slug: request.body.slug
    }
    
    new Category (newCategory).save().then(() => {
        console.log("Category saved with sucess")
    
    }).catch((err) => {
        console.log("Error register the category: "+err)
    })  
})

module.exports = router