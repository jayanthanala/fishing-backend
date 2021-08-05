const express = require('express')
const router = express.Router()
const controllers = require('../controllers/auth')
const checkAuth = require('../middlewares/checkAuth')

router.post('/register', controllers.register)

router.post('/login', controllers.login)

// router.post('/verifyEmail', controllers.sendEmail)

// router.get('/verify/:code', controllers.verifyEmail)

// // sends the link to the user for changing their password
// router.post('/resetPassword', controllers.sendResetPasswordLink)

// // sends the password page
// router.get('/changePassword/:otp', controllers.changePasswordPage)

// router.post('/changePassword', controllers.changePassword)

module.exports = router