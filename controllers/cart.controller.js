const Cart = require('../models/cart.model')
const Product = require('../models/product.model')

exports.getCart = async (req, res) => {
  const cart = await Cart.findOne({ user: req.user.id }).populate('items.product')
  res.json(cart || { items: [] })
}

exports.addToCart = async (req, res) => {
  const { productId, quantity } = req.body
  let cart = await Cart.findOne({ user: req.user.id })
  if (!cart) cart = new Cart({ user: req.user.id, items: [] })

  const itemIndex = cart.items.findIndex(i => i.product.equals(productId))
  if (itemIndex > -1) {
    cart.items[itemIndex].quantity += quantity
  } else {
    cart.items.push({ product: productId, quantity })
  }

  await cart.save()
  res.status(201).json(cart)
}

exports.updateCartItem = async (req, res) => {
  const { quantity } = req.body
  const cart = await Cart.findOne({ user: req.user.id })
  const item = cart.items.id(req.params.itemId)
  item.quantity = quantity
  await cart.save()
  res.json(cart)
}

exports.removeFromCart = async (req, res) => {
  const cart = await Cart.findOne({ user: req.user.id })
  cart.items.id(req.params.itemId).remove()
  await cart.save()
  res.json(cart)
}