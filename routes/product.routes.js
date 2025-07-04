const express = require('express')
const router = express.Router()
const controller = require('../controllers/product.controller')
const auth = require('../middlewares/auth.middleware')
const role = require('../middlewares/role.middleware')

router.get('/', controller.getAllProducts)
router.post('/', auth, role('admin'), controller.createProduct)
router.put('/:id', auth, role('admin'), controller.updateProduct)
router.delete('/:id', auth, role('admin'), controller.deleteProduct)
router.patch('/:id', auth, role('admin'), controller.updateProduct)


module.exports = router