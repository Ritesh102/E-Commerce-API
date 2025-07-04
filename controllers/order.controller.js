const Order = require('../models/order.model')
const Cart = require('../models/cart.model')

exports.createOrder = async (req, res) => {
  const cart = await Cart.findOne({ user: req.user.id })
  if (!cart || cart.items.length === 0) return res.status(400).json({ message: 'Cart is empty' })

  const order = new Order({ user: req.user.id, items: cart.items })
  await order.save()
  cart.items = []
  await cart.save()
  res.status(201).json(order)
}

exports.getOrders = async (req, res) => {
  const filter = req.user.role === 'admin' ? {} : { user: req.user.id }
  const orders = await Order.find(filter).populate('items.product')
  res.json(orders)
}