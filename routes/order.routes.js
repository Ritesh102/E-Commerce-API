const express = require('express')
const router = express.Router()
const controller = require('../controllers/order.controller')
const auth = require('../middlewares/auth.middleware')

router.use(auth)
router.get('/', controller.getOrders)
router.post('/', controller.createOrder)

module.exports = router