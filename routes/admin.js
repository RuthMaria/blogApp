const express = require('express')
const router = express.Router() // used to create routes in separate files
const validateCategory = require('../control/validateCategory')
const {itsAdmin} = require('../helpers/itsAdmin')

const mongoose = require('mongoose')
require('../models/Category')
const Category = mongoose.model('categories') //created a reference the table

require('../models/Post')
const Post = mongoose.model('posts') //created a reference the table

router.get('/', itsAdmin, (request, response) => {
    response.render("admin/index")
})

router.get('/categories', itsAdmin, (request, response) => {
    Category.find().sort({ date: 'desc' }).then((categories) => {
        response.render('admin/categories', { categories: categories.map(category => category.toJSON()) })
    }).catch((err) => {
        request.flash('error_msg', 'Error listing the categories')
        response.redirect('/admin')
    })
})

router.post('/categories/edit/:id', itsAdmin, (request, response) => {
    Category.findOne({ _id: request.params.id }).lean().then((category) => {
        response.render('admin/editcategories', { category: category })
    }).catch((err) => {
        request.flash('error_msg', 'This category does not exist')
        response.redirect('/admin/categories')
    })
})

router.post('/categories/edit', itsAdmin, (request, response) => {
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

router.post('/categories/delete', itsAdmin, (request, response) => {
    Category.deleteOne({ _id: request.body.id }).then(() => {
        request.flash('success_msg', 'Category deleted with success')
        response.redirect('/admin/categories')
    }).catch((err) => {
        request.flash('error_msg', 'Error delete the category')
        response.redirect('/admin/categories')
    })
})

router.get('/categories/add', itsAdmin, (request, response) => {
    response.render('admin/addcategories')
})

router.post('/categories/new', itsAdmin, (request, response) => {

    var error = validateCategory(request.body)

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

router.get('/posts', itsAdmin, (request, response) => {
    Post.find().populate('category').sort({ date: 'desc' }).then((posts) => {
        response.render('admin/posts', { posts: posts.map(posts => posts.toJSON()) })
    }).catch((err) => {
        request.flash('error_msg', 'Error list of posts')
        response.redirect('/admin/')
    })
})

router.get('/posts/add', itsAdmin, (request, response) => {
    Category.find().lean().then((categories) => {
        response.render('admin/addposts', { categories: categories })
    }).catch((err) => {
        request.flash('error_msg', 'Error loading the form')
        response.redirect('/admin')
    })
})

router.post('/posts/new', itsAdmin, (request, response) => {

    var error = []

    if (request.body.category == '0') {
        error.push({ text: 'Invalid category, register a category' })
    }

    if (error.length > 0) {
        response.render('admin/addposts', { error: error })

    } else {
        const newPost = {
            title: request.body.title,
            description: request.body.description,
            content: request.body.content,
            category: request.body.category,
            slug: request.body.slug
        }

        new Post(newPost).save().then(() => {
            request.flash('success_msg', 'Post created with success!')
            response.redirect('/admin/posts')
        }).catch((err) => {
            request.flash('error_msg', 'Error saved the post!')
            response.redirect('/admin/posts')
        })

    }
})

router.post('/posts/edit/:id', itsAdmin, (request, response) => {

    Post.findById({ _id: request.params.id }).lean().populate('category').then((post) => {
        Category.find().lean().then((categories) => {
            response.render('admin/editposts', { post: post, categories: categories, })
        }).catch((err) => {
            request.flash('error_msg', 'Error list the category!')
            response.redirect('/admin/posts')
        })

    }).catch((err) => {
        request.flash('error_msg', 'Error loading the form!')
        response.redirect('/admin/posts')
    })
})

router.post('/post/edit', itsAdmin, (request, response) => {
    Post.findOne({ _id: request.body.id }).then((post) => {
        post.title = request.body.title,
            post.description = request.body.description,
            post.content = request.body.content,
            post.slug = request.body.slug,
            post.category = request.body.category

        post.save().then(() => {
            request.flash('success_msg', 'Post edited with success!')
            response.redirect('/admin/posts')
        }).catch((err) => {
            request.flash('error_msg', 'Error save the edition!')
            response.redirect('/admin/posts')
        })

    }).catch((err) => {
        request.flash('error_msg', 'Error save the edition!')
        response.redirect('/admin/posts')
    })
})

router.post('/posts/delete', itsAdmin, (request, response) => {
    Post.deleteOne({_id: request.body.id}).then(() => {
        request.flash('success_msg', 'Post deleted with success')
        response.redirect('/admin/posts')
    }).catch((err) => {
        request.flash('error_msg', 'Error delete the post')
        response.redirect('/admin/posts')
    })
})

module.exports = router
