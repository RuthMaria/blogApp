const express = require('express')
const router = express.Router()

router.get('/', (request, response) => {
    response.send('Page home ADM')
})

router.get('/posts', (request, response) => {
    response.send('Page of posts')
})

router.get('/category', (request, response) => {
    response.send('Page of category')
})

module.exports = router