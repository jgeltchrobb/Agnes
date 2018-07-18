const express = require('express')
const PayRateCategories = require('../models/payRateCategories')
const router = express.Router()

// Get all payRateCategories
router.get('/', async (req, res) => {
  try {
    let payRateCategories = await PayRateCategories.findOne()
    res.send(payRateCategories)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Update payRateCategories
router.put('/', async (req, res) => {
  try {
    let payRateCategories = await PayRateCategories.update({ _id: req.params.id}, req.body)
    res.send(payRateCategories)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router
