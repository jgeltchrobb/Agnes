const express = require('express');
const Week = require('../models/week')
const User = require('../models/user')
const router = express.Router();

getMonday = (d) => {
  let day = d.getDay(),
  diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
  return new Date(d.setDate(diff));
}

// Get all Weeks
router.get('/all', async (req, res) => {
  try {
    let week = await Week.find()
    res.send(week)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})


// Get all Weeks
router.get('/', async (req, res) => {
  try {
    let weekDates = []
    let weeks = []
    let d = new Date()
    let date = getMonday(d)
    for (let i = 0; i < 7; i++) {
      if (i === 0) {
        weekDates.push(new Date(date))
      }
      let newDate = new Date(date.setDate(date.getDate() - 7))
      weekDates.push(newDate)
    }
    for (let date of weekDates) {
      date = new Date(date.setHours(date.getHours() + 10)).toISOString().split('T')[0]
      let week = await Week.findOne({date: date})
      if (week) {
        weeks.push(week)
      }
    }
    res.send(weeks)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.get('/:id', async (req, res) => {
  try {
    let weeks = []
    let week = await Week.findOne({_id: req.params.id})
    weeks.push(week)
    let weekDate = new Date(week.date)
    for (let i = 0; i < 6; i++) {
      let date = new Date(weekDate.setDate(weekDate.getDate() - 7)).toISOString().split('T')[0]
      weeks.push(await Week.findOne({date: date}))
    }
    res.send(weeks)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.get('/date/:date', async (req, res) => {
  console.log(req.params.date, 'DATE')
  try {
    let date = getMonday(new Date(req.params.date))
    let week = await Week.findOne({date: req.params.date})
    res.send(week)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.get('/previous/:date', async (req, res) => {
  try {
    let date = new Date(req.params.date)
    date = new Date(date.setDate(date.getDate() - 7)).toISOString().split('T')[0]
    let week = await Week.findOne({date: date})
    if (week) {
      res.send(week)
    } else {
      res.send(false)
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})
//
// Create new Week

router.get('/new/:weekDate', async (req, res) => {
  try {
    let tempDate = new Date(req.params.weekDate)
    tempDate = new Date(tempDate.setDate(tempDate.getDate() + 7)).toISOString().split('T')[0]
    let weekExists = await Week.findOne({date: tempDate})
    let users = await User.find()
    let userArr = []
    for (let user of users) {
      userArr.push({staffID: user._id, shifts: []})
    }
    if (!weekExists) {
      let week = await Week.create({date: tempDate, staff: userArr})
      res.send(week)
    } else {
      res.send(weekExists)
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.post('/shift/:id', async (req, res) => {
  try {
    console.log(req.body.shiftObj, 'asdasd')
    if (!req.body.pushShift) {
      let found = false
      let week = await Week.findOne({_id: req.body.shiftObj.weekID})
      for (let staff of week.staff) {
        if (staff.staffID === req.body.shiftObj.staffID) {
          for (let shift of staff.shifts) {
            if (shift.date === req.body.shiftObj.shift.date) {
              if (shift._id == req.params.id) {
                found = true
                staff.shifts.splice(staff.shifts.indexOf(shift), 1)
                staff.shifts.push(req.body.shiftObj.shift)
              }
            }
          }
          if (!found) {
            staff.shifts.push(req.body.shiftObj.shift)
          }
        }}
      await week.save()
      res.send(week)
    } else {
      let week = await Week.findOne({_id: req.body.shiftObj.weekID})
      for (let staff of week.staff) {
        if (staff.staffID === req.body.shiftObj.staffID) {
          staff.shifts.push(req.body.shiftObj.shift)
        }
      }
      await week.save()
      res.send(week)
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.post('/shift/remove/:id', async (req, res) => {
  try {
    let week = await Week.findOne({_id: req.body.weekID})
    for (let staff of week.staff) {
      if (staff.staffID === req.body.staffID) {
        for (let shift of staff.shifts) {
          if (shift._id == req.params.id) {
            staff.shifts.splice(staff.shifts.indexOf(shift), 1)
          }
        }
      }}
      await week.save()
    res.status(200).json({ confirmation: '...shift removed' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router
