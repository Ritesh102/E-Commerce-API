const User = require('../models/user.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

exports.register = async (req, res) => {
  const { name, email, password, role } = req.body
  try {
    const user = new User({ name, email, password, role })
    await user.save()
    res.status(201).json({ message: 'User registered' })
  } catch (err) {
    res.status(500).json({ message: 'Registration failed', error: err.message })
  }
}

exports.login = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })
    if (!user) return res.status(404).json({ message: 'User not found' })

    const match = await bcrypt.compare(password, user.password)
    if (!match) return res.status(401).json({ message: 'Invalid credentials' })

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET)
    res.json({ token })
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err.message })
  }
}