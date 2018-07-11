const express = require('express')
const Entitlements = require('../models/entitlements')
const router = express.Router()

// Get all entitlements
router.get('/', async (req, res) => {
  try {
    let entitlements = await Entitlements.findOne()
    res.send(entitlements)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Update entitlements
router.put('/', async (req, res) => {
  try {
    let entitlements = await Entitlements.update({ _id: req.params.id}, req.body)
    res.send(entitlements)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router
