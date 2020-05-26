// Module dependencies

const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')
require('../models/User')
const User = mongoose.model('users')

const validateUser = require('../control/validateUser')
const bcrypt = require('bcryptjs')
const passport = require('passport')


// Routes

router.get('/registry', (req, res) => {
    res.render('users/registry')
})

router.post('/registry', (req, res) => {
    
    var error = []

    error = validateUser(req.body, null)

    if (error.length > 0) {
        res.render('users/registry', { error: error, user: req.body})

    } else {
        User.findOne({ email: req.body.email }).then((user) => {
            if (user) {
                error = []   
                error = validateUser(req.body, user.email)   
                res.render('users/registry', {error: error, user: req.body})        
                
            } else {
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                    // itsAdmin:1
                })

                bcrypt.genSalt(10, (error, salt) => {
                    bcrypt.hash(newUser.password, salt, (error, hash) => {
                        if (error) {
                            req.flash('error_msg', 'Error saved the user')
                            res.redirect('/')
                        }

                        newUser.password = hash

                        newUser.save().then(() => {
                            req.flash('success_msg', 'User created with success!')
                            res.redirect('/')
                        }).catch((err) => {
                            req.flash('error_msg', 'Error create the user, try again!')
                            res.redirect('/users/registry')
                        })
                    })
                })
            }

        }).catch((err) => {
            req.flash('error_msg', 'Internal error!')
            res.redirect('/')
        })
    }
})

router.route('/login')
    .get((req, res) => {
        res.render('users/login')
    })

    .post((req, res, next) => {
        passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/users/login',
            failureFlash: true
        })(req, res, next)
    })

router.get('/logout', (req, res) => {
    req.logout()
    req.flash('success_msg', 'Logout with success!')
    res.redirect('/')
})

module.exports = router

