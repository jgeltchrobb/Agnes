const express = require('express')
const Timesheet = require('../models/timesheet')
const router = express.Router()

// Get all timesheets
router.get('/timesheets', async (req, res) => {
  try {
    let timesheets = await Timesheet.find()
    res.send(timesheets)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get timesheet by ID
router.get('/timesheets/:id', async (req, res) => {
  try {
    let timesheet = await Timesheet.find({_id: req.params.id})
    res.send(timesheet)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Create new timesheet
router.post('/timesheets', async (req, res) => {
  try {
    let timesheet = await Timesheet.create(req.body)
    res.send(timesheet)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Update timesheet details
router.put('/timesheet/:id', async (req, res) => {
  try {
    let timesheet = await Timesheet.update({ _id: req.params.id}, req.body)
    res.send(timesheet)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router