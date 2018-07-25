const express = require('express')
const Flags = require('../models/flags')
const Week = require('../models/week')
const router = express.Router()

// Get all flags
// This works well and is activated when click Rosters in the navbar
router.get('/', async (req, res) => {
  try {
    let flags = await Flags.find()
    res.send(flags)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// New flag
// Request comes from Timesheets.js in postFlag method
// Run by clicking on Timesheets in the navbar
router.put('/new', async (req, res) => {
  try {
    let flagObj = req.body.flagObj
    let week = await Week.findOne({ _id: flagObj.weekID})
    for (let staff of week.staff) {
      if (staff.staffID === flagObj.staffID) {
        for (let shift of staff.shifts) {
          if (shift._id == flagObj.shiftID) {
            if (flagObj.startOrFinish === 'start') {
              shift.start.flag = true
              break
            } else {
              shift.finish.flag = true
              break
            }
          }
        }
      }
    }
    week.save()

    let newFlag = {
                    staffID: flagObj.staffID,
                    shiftID: flagObj.shiftID,
                    startOrFinish: flagObj.startOrFinish,
                    date: flagObj.date,
                    rostered: flagObj.rostered,
                    actual: flagObj.actual,
                    active: true,
                  }
    await Flags.update( {}, { $push: { flags: newFlag } } )
    res.status(200).json({ confirmation: '...flag added' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Remove flag
// Request comes from Flag.js in removeFlag method
// Run by clicking the x button on the flag
router.delete('/remove/:id', async (req, res) => {
  try {
    let flagID = req.params.id
    let flags = await Flags.findOne()
    for (let flag of flags.flags) {
      if (flag._id == flagID) {
        flags.flags.splice(flags.flags.indexOf(flag), 1)
      }
    }
    await flags.save()
    res.status(200).json({ confirmation: '...flag removed', flags: flags })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router
