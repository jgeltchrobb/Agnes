const express = require('express')
const User = require('../models/user')
const router = express.Router()

// Get all users
router.get('/users', async (req, res) => {
  try {
    let users = await User.find()
    res.send(users)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get user by ID
router.get('/users/:id', async (req, res) => {
  try {
    let user = await User.find({_id: req.params.id})
    res.send(user)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Create new user
router.post('/users', async (req, res) => {
  try {
    let user = await User.create(req.body)
    res.send(user)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Update user details
router.put('/users/:id', async (req, res) => {
  try {
    let user = await User.update({ _id: req.params.id}, req.body)
    res.send(user)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router