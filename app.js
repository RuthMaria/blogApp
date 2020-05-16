// Loading modules
const express = require("express")
const handlebars = require("express-handlebars")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const admin = require('./routes/admin')
const path = require('path')   // works with directories and folders
const session = require('express-session')
const flash = require('connect-flash')
const app = express()
require('./models/Post')
const Post = mongoose.model('posts')
require('./models/Category')
const Category = mongoose.model('categories')
const moment = require('moment')
const users = require('./routes/user')
const passport = require('passport')
require('./config/auth')(passport)

// Settings
app.use(session({
    secret: 'keysessionsecure',
    resave: true,
    saveUninitialized: true
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(flash())

app.use((request, response, next) => { // middleware with global variables
    response.locals.success_msg = request.flash('success_msg')
    response.locals.error_msg = request.flash('error_msg')
    next()
})

app.use(bodyParser.urlencoded({
    extended:true
}))

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

mongoose.connect('mongodb://localhost/blogapp', {
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
app.get('/', (request, response) => {
    Post.find().populate('category').sort({date:'desc'}).then((posts) => {
        response.render('index', {posts:posts.map(posts => posts.toJSON()) }) 
    }).catch((err) => {
        request.flash('error_msg', 'Internal error')
        response.redirect('/404')
    })
})

app.get('/post/:slug', (request, response) => {
    Post.findOne({slug: request.params.slug}).lean().then((post) => {
        if (post) {
            response.render('post/index', {post:post})
        } else {
            request.flash('error_msg', 'This post does not exist!')
            response.redirect('/')
        }
    }).catch((err) => {
        request.flash('error_msg', 'Internal error')
        response.redirect('/')
    })
})

app.get('/categories', (request, response) => {
    Category.find().lean().then((categories) => {
        response.render('categories/index', {categories:categories})
    }).catch((err) => {
        request.flash('error_msg', 'Error listing the category!')
        response.redirect('/')
    })
})

app.get('/categories/:slug', (request, response) => {
    Category.findOne({slug:request.params.slug}).lean().then((category) => {
        if (category) {
            Post.find({category:category._id}).lean().then((posts) => {
                response.render('categories/posts', {posts:posts, category:category})
            }).catch((err) => {
                request.flash('error_msg', 'Error listing the posts')
                response.redirect('/')
            })
        } else {
            request.flash('error_msg', 'this category does not exist!')
            response.redirect('/')
        }
    }).catch((err) => {
        request.flash('error_msg', 'Error loading the page this category!')
        response.redirect('/')
    })
})

app.get('/404', (request, response) => {
    response.send('Error 404! Page not found!')
})

app.use('/admin', admin)
app.use('/users', users)

// Others
const PORT = 8080
app.listen(PORT, () => {
    console.log("The server is running on URL http://localhost:"+PORT)
})


