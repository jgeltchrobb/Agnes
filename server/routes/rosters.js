const express = require('express');
const Roster = require('../models/roster')
const router = express.Router();

// Get all rosters
router.get('/rosters', async (req, res) => {
  try {
    let roster = await Roster.find()
    res.send(roster)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get roster by ID
router.get('/rosters/:id', async (req, res) => {
  try {
    let roster = await Roster.find({_id: req.params.id})
    res.send(roster)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Create new roster
router.post('/rosters', async (req, res) => {
  try {
    let roster = await Roster.create(req.body)
    res.send(roster)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Update roster details
router.put('/rosters/:id', async (req, res) => {
  try {
    let roster = await Roster.update({_id: req.params.id}, req.body)
    res.send(roster)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Delete roster
router.delete('/rosters/:id', async (req, res) => {
  try {
    let roster = await Roster.findOneAndRemove({_id: req.params.id})
    res.send(roster)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router