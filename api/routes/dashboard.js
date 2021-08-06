const express = require('express')
const router = express.Router()
const controllers = require('../controllers/dashboard')
const checkAuth = require('../middlewares/checkAuth')

router.post('/add', checkAuth, controllers.addTrip)

router.get('/',checkAuth, controllers.dashboardInfo)

module.exports = router