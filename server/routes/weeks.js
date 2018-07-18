const express = require('express');
const Week = require('../models/week')
const User = require('../models/user')
const router = express.Router();

getMonday = (d) => {
  d = new Date(d);
  let day = d.getDay(),
      diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
  return new Date(d.setDate(diff));
}

// Get all Weeks
router.get('/', async (req, res) => {
  try {
    let weekDates = []
    let weeks = []
    let date = getMonday(new Date())
    for (let i = 0; i < 7; i++) {
      date = new Date(date.setDate(date.getDate() - 7))
      weekDates.push(date)
    }
    for (let date of weekDates) {
      date = date.toISOString().split('T')[0]
      let week = await Week.find({date: date})
      weeks.push(week)
    }
    res.send(weeks)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get Week by ID
// router.get('/:id', async (req, res) => {
//   try {
//     let week = await Week.find({_id: req.params.id})
//     res.send(week)
//   } catch (error) {
//     res.status(500).json({ error: error.message })
//   }
// })
//
// router.get('/date/:date', async (req, res) => {
//   try {
//     console.log(req.params.date)
//     let week = await Week.findOne({date: req.params.date})
//     res.send(week)
//   } catch (error) {
//     res.status(500).json({ error: error.message })
//   }
// })
//
// router.get('/previous/:date', async (req, res) => {
//   try {
//     let date = new Date(req.params.date)
//     let a = date.setDate(date.getDate() - 7)
//     a = new Date(a)
//     console.log(a.toISOString().split('T')[0])
//     let week = Week.find({date: a.toISOString().split('T')[0]})
//   } catch (error) {
//
//   }
// })
//
// Create new Week

router.post('/new/:weekDate', async (req, res) => {
  try {
    let currentDate = new Date(req.params.weekDate)
    currentDate = new Date(currentDate.setDate(currentDate.getDate() + 7))
    let weekExists = await Week.findOne({date: req.params.weekDdate})
    let users = await User.find()
    let userArr = []
    for (let user of users) {
      userArr.push({staffID: user._id, shifts: []})
    }
    if (!weekExists) {
      let found = false
      for (let i = 1; i < 8; i++) {
        let tempDate = new Date(currentDate.setDate(currentDate.getDate() + 1)).toISOString().split('T')[0]
        let wk = await Week.findOne({date: tempDate})
        if (wk) {
          found = true
          console.log(wk, 'wk')
          res.send(wk)
          break
        }
      }
      if (!found) {
        let week = await Week.create({date: currentDate.toISOString().split('T')[0]})
        console.log(week, 'week')
        res.send(week)
      }
    } else {
      console.log(weekExists, 'weekExists')
      res.send(weekExists)
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Update Week details
// // router.put('/:id', async (req, res) => {
// //   try {
// //     let week = await Week.update({_id: req.params.id}, req.body)
// //     res.send(week)
// //   } catch (error) {
// //     res.status(500).json({ error: error.message })
// //   }
// // })
// //
// // // Delete Week
// // router.delete('/:id', async (req, res) => {
// //   try {
// //     let week = await Week.findOneAndRemove({_id: req.params.id})
// //     res.send(week)
// //   } catch (error) {
// //     res.status(500).json({ error: error.message })
// //   }
// // })
//
// router.post('/shift/:id', async (req, res) => {
//   let week = await Week.findOne({ _id: req.body.weekID })
//   try {
//     let found = false
//     let week = await Week.findOne({_id: req.body.weekID})
//   try {
//     let found = false
//     let week = await Week.findOne({_id: req.body.shiftObj.weekID})
//     for (let staff of week.staff) {
//       if (staff.staffID === req.params.id) {
//         for (let shift of staff.shifts) {
//           if (shift.date === req.body.shiftObj.shift.date) {
//             shift = req.body.shiftObj.shift
//             console.log('FOUND')
//             week.save()
//             found = true
//           }
//         }
//         if (!found) {
//           staff.shifts.push(req.body.shiftObj.shift)
//           week.save()
//         }
//       }
//     }
//     // && shift.start.rostered === req.body.shift.start.rostered
//     res.send(week)
//   } catch (error) {
//     res.status(500).json({ error: error.message })
//   }
//  try {
//    let found = false
//    let week = await Week.findOne({_id: req.body.shiftObj.weekID})
//    for (let staff of week.staff) {
//      if (staff.staffID === req.params.id) {
//        for (let shift of staff.shifts) {
//          if (shift.date === req.body.shiftObj.shift.date) {
//            shift = req.body.shiftObj.shift
//            week.save()
//            found = true
//          }
//        }
//        if (!found) {
//          staff.shifts.push(req.body.shiftObj.shift)
//          week.save()
//        }
//      }
//    }
//    // && shift.start.rostered === req.body.shift.start.rostered
//    res.send(week)
//  } catch (error) {
//    res.status(500).json({ error: error.message })
//  }
// })

module.exports = router
