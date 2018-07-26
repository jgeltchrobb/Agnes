const express = require('express')
const passport = require('passport');
const User = require('../models/user')
const StandardHour = require('../models/standardHours')
const Roster = require('../models/week')
const router = express.Router()

const { requireJwt, register, signJwtForUser, login, isAdmin } = require('../middleware/auth')


// Get all users
router.get('/', async (req, res) => {
  try {
    let users = await User.find()
    res.send(users)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get user by ID
router.get('/:id', async (req, res) => {
  try {
    let user = await User.find({_id: req.params.id})
    res.send(user)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.post('/login', login, signJwtForUser)

router.post('/logout', (req, res) => {
  req.logout();
  res.sendStatus(200)
});

// Create new user
router.post('/', register, async (req, res) => {
  try {
    let standard = await StandardHour.create({staffID: req.user._id, name: req.user.name,
      categories: [
        {
          category: 'Ordinary',
          hoursWorked: 0
        },
        {
          category: 'Sat',
          hoursWorked: 0
        },
        {
          category: 'Sun',
          hoursWorked: 0
        },
        {
          category: 'Night',
          hoursWorked: 0
        },
        {
          category: 'Public Holiday',
          hoursWorked: 0
        },
        {
          category: 'Wayne Ordinary',
          hoursWorked: 0
        },
        {
          category: 'Wayne Saturday',
          hoursWorked: 0
        },
        {
          category: 'Wayne Sunday',
          hoursWorked: 0
        },
        {
          category: 'Wayne Night',
          hoursWorked: 0
        },
        {
          category: 'Wayne Public Holiday',
          hoursWorked: 0
        }
      ]
    })
    let rosters = await Roster.find()
    for (let roster of rosters) {
      let today = new Date()
      let dateDif = new Date().getDay() - 1
      let rosterDay = new Date(today.setDate(today.getDate() - dateDif)).toISOString().split('T')[0]
      if (roster.date === rosterDay) {
        roster.staff.push({staffID: req.user._id, paid: false, shifts: []})
        await roster.save()
      }
    }
    res.send({standardID: standard._id, user: req.user})
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Update user details
router.put('/:id', async (req, res) => {
  try {
    let user = await User.update({ _id: req.params.id}, req.body)
    res.send(user)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router
