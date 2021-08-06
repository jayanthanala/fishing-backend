const express = require('express')
const router = express.Router()
const controllers = require('../controllers/trip')
const checkAuth = require('../middlewares/checkAuth')

router.post('/add', checkAuth, controllers.addTrip)

router.get('/', controllers.dashboard)

module.exports = router