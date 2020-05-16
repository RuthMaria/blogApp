const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
require('../models/User')
const User = mongoose.model('users')
const validateUser= require('../control/validateUser')
const bcrypt = require('bcryptjs')


router.get('/registry', (request, response) => {
    response.render('users/registry')
})

router.post('/registry', (request, response) => {

    const error = validateUser(request.body)

    if (error.length > 0) {
        response.render('users/registry', {error:error})

    } else {
        User.findOne({email:request.body.email}).then((user) => {
            if (user) {
                request.flash('error_msg', 'There is an account with this email address!')
                response.redirect('/users/registry')
            } else {
                const newUser = new User({
                    name:request.body.name,
                    email:request.body.email,
                    password:request.body.password
                })   

                bcrypt.genSalt(10, (error, salt) => {
                    bcrypt.hash(newUser.password, salt, (error, hash) => {
                        if (error) {
                            request.flash('error_msg', 'Error saved the user')
                            response.redirect('/')
                        }

                        newUser.password = hash

                        newUser.save().then(() => {
                            request.flash('success_msg', 'User created with success!')
                            response.redirect('/')
                        }).catch((err) => {
                            request.flash('error_msg', 'Error create the user, try again!')
                            response.redirect('/users/registry')
                        })
                    })
                })
            }

        }).catch((err) => {
            request.flash('error_msg', 'Internal error!')
            response.redirect('/')
        })
    }
})

router.get('/login', (request, response) => {
    response.render('users/login')
})
module.exports = router

