const express = require('express')
const StandardHours = require('../models/standardHours')
const router = express.Router()

// Get all StandardHours
router.get('/', async (req, res) => {
  try {
    let standardHours = await StandardHours.find()
    res.send(standardHours)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Create new standard hours
// A blank one iwth only staff id will be created on user creation
router.post('/', async (req, res) => {
  try {
    let standardHours = await StandardHours.create(req.body)
    res.send(standardHours)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Update StandardHours
router.put('/:id', async (req, res) => {
  try {
    let obj = await StandardHours.findById(req.body.standardID)
    for (let cat of obj.categories) {
      if (cat._id == req.body._id) {
        cat.hoursWorked = req.body.hoursWorked
      }
    }
    await obj.save()
    res.send(obj)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router
