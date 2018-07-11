// This is just for me playing with functions to access / alter the data,
// hence the console.log() at the bottom.

const week = {
  date: new Date("July 2 2018"),
  staff:
  [
    {
      staffID: 1, shifts:
      [
        {
          date: new Date("July 2 2018"),
          shiftCategory: "floor",
          publicHoliday: false,
          wayneShift: false,
          start: {
            rostered: new Date("July 2 2018 8:00"),
            actual: new Date("July 2 2018 9:00"),
            flag: false
          },
          finish: {
            rostered: new Date("July 2 2018 16:00"),
            actual: new Date("July 2 2018 15:00"),
            flag: false
          }
        },
        {
          date: new Date("July 3 2018"),
          shiftCategory: "room",
          publicHoliday: false,
          wayneShift: false,
          start: {
            rostered: new Date("July 3 2018 8:00"),
            actual: new Date("July 3 2018 7:00"),
            flag: false
          },
          finish: {
            rostered: new Date("July 3 2018 16:00"),
            actual: new Date("July 3 2018 17:00"),
            flag: false
          }
        },
        {
          date: new Date("July 4 2018"),
          shiftCategory: "Kitchen",
          publicHoliday: false,
          wayneShift: false,
          start: {
            rostered: new Date("July 4 2018 8:00"),
            actual: new Date("July 4 2018 8:00"),
            flag: false
          },
          finish: {
            rostered: new Date("July 4 2018 16:00"),
            actual: new Date("July 4 2018 16:00"),
            flag: false
          }
        },
        {
          date: new Date("July 5 2018"),
          shiftCategory: "floor",
          publicHoliday: false,
          wayneShift: false,
          start: {
            rostered: new Date("July 5 2018 8:00"),
            actual: new Date("July 5 2018 8:00"),
            flag: false
          },
          finish: {
            rostered: new Date("July 5 2018 16:00"),
            actual: new Date("July 5 2018 16:00"),
            flag: false
          }
        },
        {
          date: new Date("July 6 2018"),
          shiftCategory: "room",
          publicHoliday: false,
          wayneShift: false,
          start: {
            rostered: new Date("July 6 2018 8:00"),
            actual: new Date("July 6 2018 8:00"),
            flag: false
          },
          finish: {
            rostered: new Date("July 6 2018 16:00"),
            actual: new Date("July 6 2018 16:00"),
            flag: false
          }
        },
        {
          date: new Date("July 7 2018"),
          shiftCategory: "Kitchen",
          publicHoliday: false,
          wayneShift: false,
          start: {
            rostered: new Date("July 7 2018 8:00"),
            actual: new Date("July 7 2018 8:00"),
            flag: false
          },
          finish: {
            rostered: new Date("July 7 2018 16:00"),
            actual: new Date("July 7 2018 16:00"),
            flag: false
          }
        },
        {
          date: new Date("July 8 2018"),
          shiftCategory: "floor",
          publicHoliday: false,
          wayneShift: false,
          start: {
            rostered: new Date("July 8 2018 8:00"),
            actual: new Date("July 8 2018 8:00"),
            flag: false
          },
          finish: {
            rostered: new Date("July 8 2018 16:00"),
            actual: new Date("July 8 2018 16:00"),
            flag: false
          }
        }, // end of saterday
      ] // end of shifts

    }, //end of staff member

    {
      staffID: 2, shifts:
      [
        {
          date: new Date("July 2 2018"),
          shiftCategory: "room",
          publicHoliday: false,
          wayneShift: false,
          start: {
            rostered: new Date("July 2 2018 8:00"),
            actual: new Date("July 2 2018 9:00"),
            flag: false
          },
          finish: {
            rostered: new Date("July 2 2018 16:00"),
            actual: new Date("July 2 2018 15:00"),
            flag: false
          }
        },
        {
          date: new Date("July 3 2018"),
          shiftCategory: "kitchen",
          publicHoliday: false,
          wayneShift: false,
          start: {
            rostered: new Date("July 3 2018 8:00"),
            actual: new Date("July 3 2018 7:00"),
            flag: false
          },
          finish: {
            rostered: new Date("July 3 2018 16:00"),
            actual: new Date("July 3 2018 17:00"),
            flag: false
          }
        },
        {
          date: new Date("July 4 2018"),
          shiftCategory: "floor",
          publicHoliday: false,
          wayneShift: false,
          start: {
            rostered: new Date("July 4 2018 8:00"),
            actual: new Date("July 4 2018 8:00"),
            flag: false
          },
          finish: {
            rostered: new Date("July 4 2018 16:00"),
            actual: new Date("July 4 2018 16:00"),
            flag: false
          }
        },
        {
          date: new Date("July 5 2018"),
          shiftCategory: "room",
          publicHoliday: false,
          wayneShift: false,
          start: {
            rostered: new Date("July 5 2018 8:00"),
            actual: new Date("July 5 2018 8:00"),
            flag: false
          },
          finish: {
            rostered: new Date("July 5 2018 16:00"),
            actual: new Date("July 5 2018 16:00"),
            flag: false
          }
        },
        {
          date: new Date("July 6 2018"),
          shiftCategory: "kitchen",
          publicHoliday: false,
          wayneShift: false,
          start: {
            rostered: new Date("July 6 2018 8:00"),
            actual: new Date("July 6 2018 8:00"),
            flag: false
          },
          finish: {
            rostered: new Date("July 6 2018 16:00"),
            actual: new Date("July 6 2018 16:00"),
            flag: false
          }
        },
        {
          date: new Date("July 7 2018"),
          shiftCategory: "floor",
          publicHoliday: false,
          wayneShift: false,
          start: {
            rostered: new Date("July 7 2018 8:00"),
            actual: new Date("July 7 2018 8:00"),
            flag: false
          },
          finish: {
            rostered: new Date("July 7 2018 16:00"),
            actual: new Date("July 7 2018 16:00"),
            flag: false
          }
        },
        {
          date: new Date("July 8 2018"),
          shiftCategory: "room",
          publicHoliday: false,
          wayneShift: false,
          start: {
            rostered: new Date("July 8 2018 8:00"),
            actual: new Date("July 8 2018 8:00"),
            flag: false
          },
          finish: {
            rostered: new Date("July 8 2018 16:00"),
            actual: new Date("July 8 2018 16:00"),
            flag: false
          }
        }, // end of saterday
      ] // end of shifts
    }, // end of staff member

    {
      staffID: 3, shifts:
      [
        {
          date: new Date("July 2 2018"),
          shiftCategory: "kitchen",
          publicHoliday: false,
          wayneShift: false,
          start: {
            rostered: new Date("July 2 2018 8:00"),
            actual: new Date("July 2 2018 9:00"),
            flag: false
          },
          finish: {
            rostered: new Date("July 2 2018 16:00"),
            actual: new Date("July 2 2018 17:00"),
            flag: false
          }
        },
        {
          date: new Date("July 3 2018"),
          shiftCategory: "floor",
          publicHoliday: false,
          wayneShift: false,
          start: {
            rostered: new Date("July 3 2018 8:00"),
            actual: new Date("July 3 2018 7:00"),
            flag: false
          },
          finish: {
            rostered: new Date("July 3 2018 16:00"),
            actual: new Date("July 3 2018 17:00"),
            flag: false
          }
        },
        {
          date: new Date("July 4 2018"),
          shiftCategory: "room",
          publicHoliday: false,
          wayneShift: false,
          start: {
            rostered: new Date("July 4 2018 8:00"),
            actual: new Date("July 4 2018 8:00"),
            flag: false
          },
          finish: {
            rostered: new Date("July 4 2018 17:00"),
            actual: new Date("July 4 2018 16:00"),
            flag: false
          }
        },
        {
          date: new Date("July 5 2018"),
          shiftCategory: "kitchen",
          publicHoliday: false,
          wayneShift: false,
          start: {
            rostered: new Date("July 5 2018 8:00"),
            actual: new Date("July 5 2018 8:00"),
            flag: false
          },
          finish: {
            rostered: new Date("July 5 2018 16:00"),
            actual: new Date("July 5 2018 16:00"),
            flag: false
          }
        },
        {
          date: new Date("July 6 2018"),
          shiftCategory: "floor",
          publicHoliday: false,
          wayneShift: false,
          start: {
            rostered: new Date("July 6 2018 8:00"),
            actual: new Date("July 6 2018 8:00"),
            flag: false
          },
          finish: {
            rostered: new Date("July 6 2018 16:00"),
            actual: new Date("July 6 2018 16:00"),
            flag: false
          }
        },
        {
          date: new Date("July 7 2018"),
          shiftCategory: "room",
          publicHoliday: false,
          wayneShift: false,
          start: {
            rostered: new Date("July 7 2018 8:00"),
            actual: new Date("July 7 2018 8:00"),
            flag: false
          },
          finish: {
            rostered: new Date("July 7 2018 18:00"),
            actual: new Date("July 7 2018 19:00"),
            flag: false
          }
        },
        {
          date: new Date("July 8 2018"),
          shiftCategory: "kitchen",
          publicHoliday: false,
          wayneShift: false,
          start: {
            rostered: new Date("July 8 2018 8:00"),
            actual: new Date("July 8 2018 8:00"),
            flag: false
          },
          finish: {
            rostered: new Date("July 8 2018 16:00"),
            actual: new Date("July 8 2018 16:00"),
            flag: false
          }
        }, // end of saterday
      ] // end of shifts
    }, // end of staff member

  ]
}

roundUp = (time) => {
  var mins = time.getMinutes()

  if (mins > 45) {
    mins = 60
  } else if (45 >= mins && mins > 30) {
    mins = 45
  } else if (30 >= mins && mins > 15) {
    mins = 30
  } else if (15 >= mins && mins > 0) {
    mins = 15
  } else {
    min = 0
  }
  time.setMinutes(mins)
  return time
}

roundDown = (time) => {
  var mins = time.getMinutes()

  if (mins >= 45) {
    mins = 45
  } else if (45 > mins && mins >= 30) {
    mins = 30
  } else if (30 > mins && mins >= 15) {
    mins = 15
  } else if (15 > mins) {
    mins = 0
  }
  time.setMinutes(mins)
  return time
}

timesheetEntry = (startOrFinish, rostered, actual) => {
  if (actual) {

    if (actual <= rostered) {
      if (startOrFinish === 'start') {
        return rostered
      }
      if (startOrFinish === 'finish') {
        return roundDown(actual)
      }
    } else {

      if (startOrFinish === 'start') {
        return roundUp(actual)
      }
      if (startOrFinish === 'finish') {
        return rostered
      }
    }
    // If no clock time then return rostered
  } else return rostered
}

// Posting to the data:
 // start.timesheet, finish.timesheet, flags > true as required
week.staff.map((staffMember) => {
  staffMember.shifts.map((shift) => {
    shift.start.timesheet ? return : (
      const start = timesheetEntry('start', shift.start.rostered, shift.start.actual)
      // if (start   shift.start.rostered) {
      // Post to db: shift.start.flag = true
    // }
    console.log(shift.date.getDate(), start)
      // Post to db: start.timesheet = start
    // )
    // shift.finish.timesheet ? return : (
      const finish = timesheetEntry('finish', shift.finish.rostered, shift.finish.actual)
      // if (finish < shift.finish.rostered) {
        // Post to db: shift.start.flag = true
      // }
    // Post to db: finish.timesheet = finsih
    // )
  })
})

// So every time someone clocks we should post to the db and then do an api call
// to update state? and then again after the above posts?

// const staffNames = []
// const timesheetData = []

// week.staff.map((staffMember) => {
//   // When have user model will loop through it and
//   // if (staffID === staffMember.staffID) then push to staffNames
//   // {staffID: 'name'}
//   // for now just push the staffID:
//   staffNames.push(staffMember.staffID)
//   // then at the bottom we also add the staffID to the timesheetData object
//
//   // Here we create the shift array that will be added to the timesheetData
//   // object
//   const staffMemberShifts = []
//   staffMember.shifts.map((shift) => {
//     var rStart = shift.start.rostered
//     var aStart = shift.start.actual
//     var rFinish = shift.finish.rostered
//     var aFinish = shift.finish.actual
//     staffMemberShifts.push(
//       {
//         date:           shift.date,
//         category:       shift.shiftCategory,
//         startRostered:  rStart,
//         startActual:    aStart,
//         start:          startTime(rStart, aStart),
//         finishRostered:  rFinish,
//         finishActual:    aFinish,
//         finish:         finishTime(rFinish, aFinish)
//       }
//     )
//   })
//   // Push each staffMemeberShifts Array of objects:
//   // { staffID:'', staffMemberShifts (array) } to the timesheetData Array
//   timesheetData.push(
//     {
//       staffID:  staffMember.staffID,
//       shifts:   staffMemberShifts
//     }
//   )
// })
