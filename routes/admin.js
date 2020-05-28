// Module dependencies

const express = require('express')
const router = express.Router() // used to create routes in separate files
const validateCategory = require('../control/validateCategory')
const {itsAdmin} = require('../helpers/itsAdmin')

const mongoose = require('mongoose')
require('../models/Category')
const Category = mongoose.model('categories') //created a reference the table

require('../models/Post')
const Post = mongoose.model('posts') //created a reference the table


// routes

router.get('/categories', itsAdmin, (req, res) => {
    Category.find().sort({ date: 'desc' }).then((categories) => {
        res.render('admin/categories', { categories: categories.map(category => category.toJSON()) })
    }).catch((err) => {
        req.flash('error_msg', 'Error listing the categories')
        res.redirect('/admin')
    })
})

router.get('/categories/add', itsAdmin, (req, res) => {
    res.render('admin/addcategories')
})

router.post('/categories/new', itsAdmin, (req, res) => {

    var error = validateCategory(req.body)

    if (error.length > 0) {
        res.render('admin/addcategories', { error: error })
    }

    else {
        const newCategory = {
            name: req.body.name,
            slug: req.body.slug
        }

        new Category(newCategory).save().then(() => {
            req.flash('success_msg', 'Category created with success')
            res.redirect('/admin/categories')
        }).catch((err) => {
            req.flash('error_msg', 'Error create the category, try again!')
            res.redirect('/admin')
        })
    }
})

router.get('/categories/edit/:id', itsAdmin, (req, res) => {
    Category.findOne({ _id: req.params.id }).lean().then((category) => {
         res.render('admin/editcategories', { category: category })
    }).catch((err) => {
        req.flash('error_msg', 'This category does not exist')
        res.redirect('/admin/categories')
    })
})

router.post('/categories/edit', itsAdmin, (req, res) => {
    Category.findOne({ _id: req.body.id }).then((category) => {

        category.name = req.body.name
        category.slug = req.body.slug

        category.save().then(() => {
            req.flash('success_msg', 'Category edited with success')
            res.redirect('/admin/categories')
        }).catch((err) => {
            req.flash('error_msg', 'Error save the edition')
            res.redirect('/admin/categories')
        })

    }).catch((err) => {
        req.flash('error_msg', 'Error edit the category')
        res.redirect('/admin/categories')
    })
})

router.post('/categories/delete', itsAdmin, (req, res) => {
    Category.deleteOne({ _id: req.body.id }).then(() => {
        req.flash('success_msg', 'Category deleted with success')
        res.redirect('/admin/categories')
    }).catch((err) => {
        req.flash('error_msg', 'Error delete the category')
        res.redirect('/admin/categories')
    })
})

router.get('/posts', itsAdmin, (req, res) => {
    Post.find().populate('category').sort({ date: 'desc' }).then((posts) => {
        res.render('admin/posts', { posts: posts.map(posts => posts.toJSON()) })
    }).catch((err) => {
        req.flash('error_msg', 'Error list of posts')
        res.redirect('/admin/')
    })
})

router.get('/posts/add', itsAdmin, (req, res) => {
    Category.find().lean().then((categories) => {
        res.render('admin/addposts', { categories: categories })
    }).catch((err) => {
        req.flash('error_msg', 'Error loading the form')
        res.redirect('/admin')
    })
})

router.post('/posts/new', itsAdmin, (req, res) => {

    var error = []

    if (req.body.category == '0') {
        error.push({ text: 'Invalid category, register a category' })
    }

    if (error.length > 0) {
        res.render('admin/addposts', { error: error })

    } else {
        const newPost = {
            title: req.body.title,
            description: req.body.description,
            content: req.body.content,
            category: req.body.category,
            slug: req.body.slug
        }

        new Post(newPost).save().then(() => {
            req.flash('success_msg', 'Post created with success!')
            res.redirect('/admin/posts')
        }).catch((err) => {
            req.flash('error_msg', 'Error saved the post!')
            res.redirect('/admin/posts')
        })

    }
})

router.get('/posts/edit/:id', itsAdmin, (req, res) => {

    Post.findById({ _id: req.params.id }).lean().populate('category').then((post) => {
        Category.find().lean().then((categories) => {
            res.render('admin/editposts', { post: post, categories: categories})
        }).catch((err) => {
            req.flash('error_msg', 'Error list the category!')
            res.redirect('/admin/posts')
        })

    }).catch((err) => {
        req.flash('error_msg', 'Error loading the form!')
        res.redirect('/admin/posts')
    })
})

router.post('/post/edit', itsAdmin, (req, res) => {
    Post.findOne({ _id: req.body.id }).then((post) => {
        post.title = req.body.title,
            post.description = req.body.description,
            post.content = req.body.content,
            post.slug = req.body.slug,
            post.category = req.body.category

        post.save().then(() => {
            req.flash('success_msg', 'Post edited with success!')
            res.redirect('/admin/posts')
        }).catch((err) => {
            req.flash('error_msg', 'Error save the edition!')
            res.redirect('/admin/posts')
        })

    }).catch((err) => {
        req.flash('error_msg', 'Error save the edition!')
        res.redirect('/admin/posts')
    })
})

router.post('/posts/delete', itsAdmin, (req, res) => {
    Post.deleteOne({_id: req.body.id}).then(() => {
        req.flash('success_msg', 'Post deleted with success')
        res.redirect('/admin/posts')
    }).catch((err) => {
        req.flash('error_msg', 'Error delete the post')
        res.redirect('/admin/posts')
    })
})

router.get('/administrator', itsAdmin, (req, res) => {
    res.render('admin/administrator')
})

module.exports = router
