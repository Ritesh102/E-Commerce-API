const express = require('express')
const router = express.Router()
const controller = require('../controllers/cart.controller')
const auth = require('../middlewares/auth.middleware')

router.use(auth)
router.get('/', controller.getCart)
router.post('/', controller.addToCart)
router.put('/:itemId', controller.updateCartItem)
router.delete('/:itemId', controller.removeFromCart)

module.exports = router