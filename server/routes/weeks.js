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
router.put('/:id', async (req, res) => {
  try {
    let week = await Week.update({_id: req.params.id}, req.body)
    res.send(week)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Delete Week
router.delete('/:id', async (req, res) => {
  try {
    let week = await Week.findOneAndRemove({_id: req.params.id})
    res.send(week)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.post('/shift/:id', async (req, res) => {
  try {
    let found = false
    let week = await Week.findOne({_id: req.body.weekID})
    for (let staff of week.staff) {
      if (staff.staffID === req.params.id) {
        for (let shift of staff.shifts) {
          if (shift.date === req.body.shift.date) {
            // Update
            shift = req.body.shift
            week.save()
            found = true
          }
        }
        if (!found) {
          // Push
          staff.shifts.push(req.body.shift)
          week.save()
        }
      }
    }
    res.send(week)
  } catch (error) {
    res.status(500).json({ error: error.message })    
  }
})

module.exports = router