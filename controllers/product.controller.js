const Product = require('../models/product.model')

exports.getAllProducts = async (req, res) => {
  const { search, page = 1, limit = 10 } = req.query
  const query = search ? { name: { $regex: search, $options: 'i' } } : {}
  const products = await Product.find(query)
    .skip((page - 1) * limit)
    .limit(Number(limit))
  res.json(products)
}

exports.createProduct = async (req, res) => {
  const product = new Product(req.body)
  await product.save()
  res.status(201).json(product)
}

exports.updateProduct = async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
  res.json(product)
}

exports.deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id)
  res.json({ message: 'Product deleted' })
}