const express = require('express');
const Week = require('../models/week')
const router = express.Router();

// Get all Weeks
router.get('/', async (req, res) => {
  try {
    let week = await Week.find()
    res.send(week)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get Week by ID
router.get('/:id', async (req, res) => {
  try {
    let week = await Week.find({_id: req.params.id})
    res.send(week)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Create new Week
router.post('/', async (req, res) => {
  console.log(req.body)
  try {
    let week = await Week.create(req.body)
    res.send(week)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Update Week details
router.put('/weeks/:id', async (req, res) => {
  try {
    let week = await Week.update({_id: req.params.id}, req.body)
    res.send(week)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Delete Week
router.delete('/weeks/:id', async (req, res) => {
  try {
    let week = await Week.findOneAndRemove({_id: req.params.id})
    res.send(week)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router