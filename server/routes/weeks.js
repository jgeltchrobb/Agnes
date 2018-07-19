const express = require('express');
const Week = require('../models/week')
const User = require('../models/user')
const router = express.Router();

getMonday = (d) => {
  let day = d.getDay(),
  diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
  // d.setTime( d.getTime() + d.getTimezoneOffset()*60*1000 );
  // d.setHours(d.getHours() - 4);
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
    let date = getMonday(new Date())
    for (let i = 0; i < 7; i++) {
      if (i === 0) {
        weekDates.push(new Date(date))
      }
      let newDate = new Date(date.setDate(date.getDate() - 7))
      weekDates.push(newDate)
    }
    for (let date of weekDates) {
      date = date.toISOString().split('T')[0]
      let week = await Week.findOne({date: date})
      if (week) {
        weeks.push(week)
      }
    }
    console.log(weeks)
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
router.get('/previous/:date', async (req, res) => {
  try {
    let date = new Date(req.params.date)
    date = new Date(date.setDate(date.getDate() - 7)).toISOString().split('T')[0]
    let week = await Week.findOne({date: date})
    console.log(week, 'WEEEK')
    console.log(!!week)
    if (week) {
      console.log(1111)
      res.send(week)
    } else {
      console.log(22222)
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
