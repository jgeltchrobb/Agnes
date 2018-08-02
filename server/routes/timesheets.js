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
  const timeObj = req.body.timeObj
  const shiftNumber =  Number(timeObj.shiftNumber[0])
  try {
    let week = await Week.findOne({_id: timeObj.weekID})
    for (let staff of week.staff) {
      if (staff.staffID === timeObj.staffID) {
        let counter = 1
        for (let shift of staff.shifts) {
          if (shift._id == timeObj.shiftID) {
            if (timeObj.startOrFinish === 'start') {
              shift.start.timesheet = timeObj.time
              shift.start.postRequired = false
            } else if (timeObj.startOrFinish === 'finish') {
              shift.finish.timesheet = timeObj.time
              shift.finish.postRequired = false
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
