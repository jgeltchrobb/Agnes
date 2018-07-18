const express = require('express');
const Week = require('../models/week')
const User = require('../models/user')
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

router.get('/date/:date', async (req, res) => {
  try {
    console.log(req.params.date)
    let week = await Week.findOne({date: req.params.date})
    res.send(week)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.get('/previous/:date', async (req, res) => {
  try {
    let date = new Date(req.params.date)
    let a = date.setDate(date.getDate() - 7)
    a = new Date(a)
    console.log(a.toISOString().split('T')[0])
    let week = Week.find({date: a.toISOString().split('T')[0]})
  } catch (error) {

  }
})

// Create new Week
router.post('/new', async (req, res) => {
  try {
    let currentDate = new Date('2018-07-19')
    let date = currentDate.toISOString().split('T')[0]
    let weekExists = await Week.findOne({date: date})
    let users = await User.find()
    let userArr = []
    for (let user of users) {
      userArr.push({staffID: user._id, shifts: []})
    }
    if (!weekExists) {
      let prevFound = false
      let nextFound = false
      for (let i = 1; i < 8; i++) {
        let tempDate = new Date(currentDate.setDate(currentDate.getDate() - 1)).toISOString().split('T')[0]
        let wk = await Week.findOne({date: tempDate})
        if (wk) {
          prevFound = true
          let weekDate = new Date(wk.date)
          let temp = weekDate.setDate(weekDate.getDate() + 7)
          temp = new Date(temp).toISOString().split('T')[0]
          let week = await Week.create({date: temp, staff: userArr})
          res.send(week)
        }
      }
      if (!prevFound) {
        for (let i = 1; i < 8; i++) {
          let nextDate = new Date(currentDate.setDate(currentDate.getDate() + 1)).toISOString().split('T')[0]
          let nextWk = await Week.findOne({date: nextDate})
          if (nextWk) {
            nextFound = true
            let weekDate = new Date(nextWk.date)
            let temp = weekDate.setDate(weekDate.getDate() + 7)
            temp = new Date(temp).toISOString().split('T')[0]
            let week = await Week.create({date: temp, staff: userArr})
            res.send(week)
          }
        }
      }
      if (!prevFound && !nextFound) {
        let week = await Week.create({date: date, staff: userArr})
        res.send(week)
      }
    } else {
      res.send(weekExists)
    }
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
   let week = await Week.findOne({_id: req.body.shiftObj.weekID})
   for (let staff of week.staff) {
     if (staff.staffID === req.params.id) {
       for (let shift of staff.shifts) {
         if (shift.date === req.body.shiftObj.shift.date) {
           shift = req.body.shiftObj.shift
           week.save()
           found = true
         }
       }
       if (!found) {
         staff.shifts.push(req.body.shiftObj.shift)
         week.save()
       }
     }
   }
   // && shift.start.rostered === req.body.shift.start.rostered
   res.send(week)
 } catch (error) {
   res.status(500).json({ error: error.message })
 }
})

module.exports = router
