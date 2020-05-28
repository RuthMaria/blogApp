// Module dependencies

const express = require("express")
const app = express()
const handlebars = require("express-handlebars")
const bodyParser = require("body-parser") //to acess the form
const mongoose = require("mongoose")
const admin = require('./routes/admin')
const users = require('./routes/user')
const path = require('path')   // works with directories and folders
const session = require('express-session')
const flash = require('connect-flash')
const moment = require('moment') // to formate Date
const passport = require('passport')

require('./models/Post')
const Post = mongoose.model('posts')

require('./models/Category')
const Category = mongoose.model('categories')

require('./config/auth')(passport)
const db = require('./config/db')


// Configuration

app.use(session({
    secret: 'keysessionsecure',
    resave: true,
    saveUninitialized: true
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(flash())

app.use((req, res, next) => { // middleware with global variables
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error = req.flash('error')
    res.locals.user = req.user || null
    next()
})

app.use(bodyParser.urlencoded({ extended:true }))
app.use(bodyParser.json())

app.engine('handlebars', handlebars({
    defaultLayout: 'main',
    helpers: {
        formatDate: (date) => {
            return moment(date).format('DD/MM/YYYY')
        }
    }
}))
app.set('view engine', 'handlebars')

mongoose.Promise = global.Promise

mongoose.connect(db.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true, 
    useCreateIndex: true
}).then(() => {
    console.log("MongoDB conected ...")
    
}).catch((err) => {
    console.log("Error connecting to mongoDB "+err)
})


// Public

app.use(express.static(path.join(__dirname, "public")))


// Routes

app.get('/', (req, res) => {
    Post.find().populate('category').sort({date:'desc'}).then((posts) => {
        res.render('index', {posts:posts.map(posts => posts.toJSON())}) 
    }).catch((err) => {
        req.flash('error_msg', 'Internal error')
        res.redirect('/404')
    })
})

app.get('/post/:slug', (req, res) => {
    Post.findOne({slug: req.params.slug}).lean().then((post) => {
        if (post) {
            res.render('post/index', {post:post})
        } else {
            req.flash('error_msg', 'This post does not exist!')
            res.redirect('/')
        }
    }).catch((err) => {
        req.flash('error_msg', 'Internal error')
        res.redirect('/')
    })
})

app.get('/categories', (req, res) => {
    Category.find().lean().then((categories) => {
        res.render('categories/index', {categories:categories})
    }).catch((err) => {
        req.flash('error_msg', 'Error listing the category!')
        res.redirect('/')
    })
})

app.get('/categories/:slug', (req, res) => {
    Category.findOne({slug:req.params.slug}).lean().then((category) => {
        if (category) {
            Post.find({category:category._id}).lean().then((posts) => {
                res.render('categories/posts', {posts:posts, category:category})
            }).catch((err) => {
                req.flash('error_msg', 'Error listing the posts')
                res.redirect('/')
            })
        } else {
            req.flash('error_msg', 'this category does not exist!')
            res.redirect('/')
        }
    }).catch((err) => {
        req.flash('error_msg', 'Error loading the page this category!')
        res.redirect('/')
    })
})

app.get('/404', (req, res) => {
    res.send('Error 404! Page not found!')
})

app.use('/admin', admin)
app.use('/users', users)


// Others

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log("The server is running on URL http://localhost:"+PORT)
})


