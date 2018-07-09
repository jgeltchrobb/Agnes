// This is just for me playing with functions to access / alter the data,
// hence the console.log() at the bottom.

const week = {
  // It's just an object holding the date and all the staff objects for the week
  date: new Date("July 2 2018"),
  '1': [ {
          date: new Date("July 2 2018"),
          shiftCategory: "floor",
          publicHoliday: false,
          wayneShift: false,
          start:  {
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
        },
      ], // end of staff member


   '2': [ {
          date: new Date("July 2 2018"),
          shiftCategory: "room",
          publicHoliday: false,
          wayneShift: false,
          start: {
                    rostered: new Date("July 2 2018 7:00"),
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
        },
      ], // end of staff member


  '3': [ {
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
        },
      ], // end of staff member
}

roundUp = (time) => {
  var mins = time.getMinutes()

  if (mins < 15) {
    mins = 15
  } else if (15 < mins && mins < 30) {
    mins = 30
  } else if (30 < mins && mins < 45) {
    mins = 45
  } else if (45 < mins && mins < 61) {
    mins = 60
  }
  time.setMinutes(mins)
  return time
}

roundDown = (time) => {
  var mins = time.getMinutes()

  if (mins > 45) {
    mins = 45
  } else if (45 > mins && mins > 30) {
    mins = 30
  } else if (30 > mins && mins > 15) {
    mins = 15
  } else if (15 > mins) {
    mins = 0
  }
  time.setMinutes(mins)
  return time
}

startTime = (rStart, aStart) => {
  // If no clock time then return rostered
  if (aStart) {
    if (aStart <= rStart) {
      return rStart
    } else {
      // Do post request to create flag!
      return roundUp(aStart)
    }
  } else return rStart
}

finishTime = (rFinish, aFinish) => {
  // If no clock time then return rostered
  if (aFinish) {
    if (aFinish >= rFinish) {
      return rFinish
    } else {
      // Do post request to create flag!
      return roundDown(aFinish)
    }
  } else return rFinish
}

const staffNames = []
const timesheetData = []

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



console.log(week['2'].map((s) => {
  return s.start.rostered
})

)
