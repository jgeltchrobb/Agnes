const express = require('express')
const Week = require('../models/week')
const router = express.Router()

// Update Timesheet time
    // request comes from Timesheets.js in the postTimesheetTime method
      // and also from Value.js in the postTimesheetTime method
      // same request, same object and same process.
    // In both cases it will exist in the db and must just be replaced
    // Run by clicking on Timesheets in navbar
router.post('/timesheet-time/update', async (req, res) => {
  // same as updating rostered start / finish times in the shifts one you were working on
  // but now start.timesheet instead of start.rostered (same for finish)
  try {
    let week = await Week.findOne({_id: req.body.timeObj.weekID})
    for (let staff of week.staff) {
      if (staff.staffID === req.body.timeObj.staffID) {
        for (let shift of staff.shifts) {
          if (shift._id == req.body.timeObj.shiftID) {
            if (req.body.timeObj.startOrFinish === 'start') {
              shift.start.timesheet = req.body.timeObj.time
            } else {
              shift.finish.timesheet = req.body.timeObj.time
            }
          }
        }
      }
    }
    await week.save()
    res.status(200).json({ confirmation: '...timesheet time added'})
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})


module.exports = router
