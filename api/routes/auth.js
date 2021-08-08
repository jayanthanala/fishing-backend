const express = require('express')
const router = express.Router()
const controllers = require('../controllers/auth')
const checkAuth = require('../middlewares/checkAuth')

router.post('/register', controllers.register)

router.post('/login', controllers.login)

module.exports = router
