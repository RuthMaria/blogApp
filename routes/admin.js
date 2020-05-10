const express = require('express')
const router = express.Router() // used to create routes in separate files
const validateFields = require('../control/validateFields')

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
    Category.find().sort({ date: 'desc' }).then((categories) => {
        response.render('admin/categories', { categories: categories.map(category => category.toJSON()) })
    }).catch((err) => {
        request.flash('error_msg', 'Error listing the categories')
        response.redirect('/admin')
    })
})

router.get('/categories/edit/:id', (request, response) => {
    Category.findOne({ _id: request.params.id }).lean().then((category) => {
        response.render('admin/editcategories', { category: category })
    }).catch((err) => {
        request.flash('error_msg', 'This category does not exist')
        response.redirect('/admin/categories')
    })
})

router.post('/categories/edit', (request, response) => {
    Category.findOne({ _id: request.body.id }).then((category) => {

        category.name = request.body.name
        category.slug = request.body.slug

        category.save().then(() => {
            request.flash('success_msg', 'Category edited with success')
            response.redirect('/admin/categories')
        }).catch((err) => {
            request.flash('error_msg', 'Error save the edition')
            response.redirect('/admin/categories')
        })

    }).catch((err) => {
        request.flash('error_msg', 'Error edit the category')
        response.redirect('/admin/categories')
    })
})

router.get('/categories/add', (request, response) => {
    response.render('admin/addcategories')
})

router.post('/categories/new', (request, response) => {

    var error = validateFields(request.body)

    if (error.length > 0) {
        response.render('admin/addcategories', { error: error })
    }
    else {
        const newCategory = {
            name: request.body.name,
            slug: request.body.slug
        }

        new Category(newCategory).save().then(() => {
            request.flash('success_msg', 'Category created with success')
            response.redirect('/admin/categories')
        }).catch((err) => {
            request.flash('error_msg', 'Error create the category, try again!')
            response.redirect('/admin')
        })
    }
})

module.exports = router