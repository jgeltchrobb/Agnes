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

    {date: '2018-07-15'}
    // let date = new Date().toISOString().split('T')[0]
    // let dateObj = new Date(date)
    let weekExists = await Week.findOne({date: req.body.date})
    let users = await User.find()
    let userArr = []
    for (let user of users) {
      userArr.push({staffID: user._id, shifts: []})
    }

    if (!weekExists) {
      for (let i = 1; i < 8; i++) {
        let tempDate = new Date(dateObj.setDate(dateObj.getDate() - 1)).toISOString().split('T')[0]
        let wk = await Week.findOne({date: tempDate})
        if (wk) {
          let createDate = new Date(wk.date)
          let finalDate = new Date(tempDate.setDate(createDate.getDate() + 7)).toISOString().split('T')[0]
          let week = await Week.create({date: finalDate, staff: userArr})
          res.send(week)
          break
          }
        }
        let week = await Week.create({date: date, staff: userArr})
        res.send(week)
      } else {
        await Week.create({date: new Date('2018-07-8')})
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
  console.log(req.body)
<<<<<<< HEAD
  console.log('!!!!!!!!!!!')
  console.log(req.params)

  let week = await Week.findOne({ _id: req.body.weekID })
  console.log(week, 'week')
  try {
    let found = false
<<<<<<< HEAD
=======
    let week = await Week.findOne({_id: req.body.weekID})
    console.log(week)
>>>>>>> 4990eb1779ec41734b070cb3e900cd8a956f38b4
=======
  try {
    let found = false
    let week = await Week.findOne({_id: req.body.shiftObj.weekID})
>>>>>>> 9709c2dee3ad6574480da9b02f4fd564c0ad5bc9
    for (let staff of week.staff) {
      if (staff.staffID === req.params.id) {
        for (let shift of staff.shifts) {
          if (shift.date === req.body.shiftObj.shift.date) {
            shift = req.body.shiftObj.shift
            console.log('FOUND')
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
