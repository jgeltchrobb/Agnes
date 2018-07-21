const express = require('express')
const Flags = require('../models/Week')
const router = express.Router()

// Update Timesheet time
    // request comes from Timesheets.js in the postTimesheetTime method
      // and also from Value.js in the postTimesheetTime method
      // same request, same object and same process.
    // In both cases it will exist in the db and must just be replaced
    // Run by clicking on Timesheets in navbar
router.put('/timesheet-time/update', async (req, res) => {
  // same as updating rostered start / finish times in the shifts one you were working on
  // but now start.timesheet instead of start.rostered (same for finish)
  console.log(req.body.timeObj)
  try {
    res.status(200).json({ confirmation: '...timesheet time added' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})


module.exports = router
