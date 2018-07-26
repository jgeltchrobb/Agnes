const express = require('express')
const Week = require('../models/week')
const router = express.Router()


// Update clock in/out times
router.post('/new', async (req, res) => {
  try {
    let week = await Week.findOne({ _id: req.body.weekID})
    for (let staff of week.staff) {
      if (staff.staffID === req.body.staffID) {
        for (let shift of staff.shifts) {
          if (shift._id == req.body.shiftID) {
            if (req.body.startOrFinish === 'start') {
              shift.start.actual = req.body.time
              break
            } else {
              shift.finish.actual = req.body.time
              break
            }
          }
        }
      }
    }
    week.save()
    res.sendStatus(203)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get clock week (current week)
// router.get('/', async (req, res) => {
//   try {
//     var date =
//     }
//     res.send(weeks)
//   } catch (error) {
//     res.status(500).json({ error: error.message })
//   }
// })

module.exports = router
