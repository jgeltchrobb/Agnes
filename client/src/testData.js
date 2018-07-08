// This is just for me playing with functions to access / alter the data,
// hence the console.log() at the bottom.

const week = {
  date: "2018-07-2",
  staff:
  [
    {
      staffID: 1, shifts:
      [
        {
          day: 'monday',
          date: "2018-07-2",
          shiftCategory: "floor",
          start: {
            rostered: 8,
            actual: 9,
            flag: false
          },
          finish: {
            rostered: 16,
            actual: 15,
            flag: false
          }
        },
        {
          day: 'tuesday',
          date: "2018-07-3",
          shiftCategory: "room",
          start: {
            rostered: 8,
            actual: 7,
            flag: false
          },
          finish: {
            rostered: 16,
            actual: 17,
            flag: false
          }
        },
        {
          day: 'wednesday',
          date: "2018-07-4",
          shiftCategory: "Kitchen",
          start: {
            rostered: 8,
            actual: 8,
            flag: false
          },
          finish: {
            rostered: 16,
            actual: 16,
            flag: false
          }
        },
        {
          day: 'thursday',
          date: "2018-07-5",
          shiftCategory: "floor",
          start: {
            rostered: 8,
            actual: 8,
            flag: false
          },
          finish: {
            rostered: 16,
            actual: 16,
            flag: false
          }
        },
        {
          day: 'friday',
          date: "2018-07-6",
          shiftCategory: "room",
          start: {
            rostered: 8,
            actual: 8,
            flag: false
          },
          finish: {
            rostered: 16,
            actual: 16,
            flag: false
          }
        },
        {
          day: 'saterday',
          date: "2018-07-7",
          shiftCategory: "Kitchen",
          start: {
            rostered: 8,
            actual: 8,
            flag: false
          },
          finish: {
            rostered: 16,
            actual: 16,
            flag: false
          }
        },
        {
          day:'sunday',
          date: "2018-07-8",
          shiftCategory: "floor",
          start: {
            rostered: 8,
            actual: 8,
            flag: false
          },
          finish: {
            rostered: 16,
            actual: 16,
            flag: false
          }
        }, // end of saterday
      ] // end of shifts

    }, //end of staff member

    {
      staffID: 2, shifts:
      [
        {
          day: 'monday',
          date: "2018-07-2",
          shiftCategory: "room",
          start: {
            rostered: 8,
            actual: 9,
            flag: false
          },
          finish: {
            rostered: 16,
            actual: 15,
            flag: false
          }
        },
        {
          day: 'tuesday',
          date: "2018-07-3",
          shiftCategory: "kitchen",
          start: {
            rostered: 8,
            actual: 7,
            flag: false
          },
          finish: {
            rostered: 16,
            actual: 17,
            flag: false
          }
        },
        {
          days: 'wednesday',
          date: "2018-07-4",
          shiftCategory: "floor",
          start: {
            rostered: 8,
            actual: 8,
            flag: false
          },
          finish: {
            rostered: 16,
            actual: 16,
            flag: false
          }
        },
        {
          days: 'thursday',
          date: "2018-07-5",
          shiftCategory: "room",
          start: {
            rostered: 8,
            actual: 8,
            flag: false
          },
          finish: {
            rostered: 16,
            actual: 16,
            flag: false
          }
        },
        {
          day: 'friday',
          date: "2018-07-6",
          shiftCategory: "kitchen",
          start: {
            rostered: 8,
            actual: 8,
            flag: false
          },
          finish: {
            rostered: 16,
            actual: 16,
            flag: false
          }
        },
        {
          day: 'saterday',
          date: "2018-07-7",
          shiftCategory: "floor",
          start: {
            rostered: 8,
            actual: 8,
            flag: false
          },
          finish: {
            rostered: 16,
            actual: 16,
            flag: false
          }
        },
        {
          day: 'sunday',
          date: "2018-07-8",
          shiftCategory: "room",
          start: {
            rostered: 8,
            actual: 8,
            flag: false
          },
          finish: {
            rostered: 16,
            actual: 16,
            flag: false
          }
        }, // end of saterday
      ] // end of shifts
    }, // end of staff member

    {
      staffID: 3, shifts:
      [
        {
          day: 'monday',
          date: "2018-07-2",
          shiftCategory: "kitchen",
          start: {
            rostered: 8,
            actual: 9,
            flag: false
          },
          finish: {
            rostered: 16,
            actual: 15,
            flag: false
          }
        },
        {
          day: 'tuesday',
          date: "2018-07-3",
          shiftCategory: "floor",
          start: {
            rostered: 8,
            actual: 7,
            flag: false
          },
          finish: {
            rostered: 16,
            actual: 17,
            flag: false
          }
        },
        {
          day: 'wednesday',
          date: "2018-07-4",
          shiftCategory: "room",
          start: {
            rostered: 8,
            actual: 8,
            flag: false
          },
          finish: {
            rostered: 17,
            actual: 16,
            flag: false
          }
        },
        {
          day: 'thursday',
          date: "2018-07-5",
          shiftCategory: "kitchen",
          start: {
            rostered: 8,
            actual: 8,
            flag: false
          },
          finish: {
            rostered: 16,
            actual: 16,
            flag: false
          }
        },
        {
          day: 'friday',
          date: "2018-07-6",
          shiftCategory: "floor",
          start: {
            rostered: 8,
            actual: 8,
            flag: false
          },
          finish: {
            rostered: 16,
            actual: 16,
            flag: false
          }
        },
        {
          day: 'saterday',
          date: "2018-07-7",
          shiftCategory: "room",
          start: {
            rostered: 8,
            actual: 8,
            flag: false
          },
          finish: {
            rostered: 18,
            actual: 19,
            flag: false
          }
        },
        {
          day: 'sunday',
          date: "2018-07-8",
          shiftCategory: "kitchen",
          start: {
            rostered: 8,
            actual: 8,
            flag: false
          },
          finish: {
            rostered: 16,
            actual: 16,
            flag: false
          }
        }, // end of saterday
      ] // end of shifts
    }, // end of staff member

  ]
}

startTime = (rStart, aStart) => {
  // If no clock time then what is it?
  if (aStart) {
    if (aStart <= rStart) {
      return rStart
    } else {
      // Do post request to create flag!
      // return actual (rounded UP to next 15 min interval)
      // for now just return actual
      return aStart
    }
  } else return rStart
}

finishTime = (rFinish, aFinish) => {
  // If no clock time then what is it?
  if (aFinish) {
      if (aFinish >= rFinish) {
        return rFinish
      } else {
        // Do post request to create flag!
        // return actual (rounded DOWN to next 15 min interval)
        // for now just return actual
        return aFinish
      }
    } else return rFinish
}

const staffNames = []
const timesheetData = []

week.staff.map((staffMember) => {
  // When have user model will loop through it and
  // if (staffID === staffMember.staffID) then push to staffNames
  // {staffID: 'name'}
  // for now just push the staffID:
  staffNames.push(staffMember.staffID)
  // then at the bottom we also add the staffID to the timesheetData object

  // Here we create the shift array that will be added to the timesheetData
  // object
  const staffMemberShifts = []
  staffMember.shifts.map((shift) => {
    const rStart = shift.start.rostered
    const aStart = shift.start.actual
    const rFinish = shift.finish.rostered
    const aFinish = shift.finish.actual
    staffMemberShifts.push(
      {
        date:           shift.date,
        category:       shift.shiftCategory,
        startRostered:  rStart,
        startActual:    aStart,
        start:          startTime(rStart, aStart),
        finishRostered:  rFinish,
        finishActual:    aFinish,
        finish:         finishTime(rFinish, aFinish)
      }
    )
  })
  // Push each timesheetData object to the timesheetData Array
  timesheetData.push(
    {
      staffID:  staffMember.staffID,
      shifts:   staffMemberShifts
    }
  )
})

const categories = ['Ord Hrs','Sat Hrs','Annual Leave','Sick Leave',
'Public Hols','L/S Leave ','Wayne Weekly','Wayne Sat','Wayne Sun',
'Wayne Public Hols ','Sleep Over','Total']

const totalsRows = []

timesheetData.map((staffMember) => {
  const totalsRow = {}
  totalsRow.staffID = staffMember.staffID
  categories.map((cat) => {
    totalsRow[cat] = ''
  })
  staffMember.shifts.map((shift) => {
    if (!totalsRow[shift.category]) {
      totalsRow[shift.category] = (shift.finish - shift.start)
    } else {
      totalsRow[shift.category] += (shift.finish - shift.start)
    }
  })
  totalsRows.push(totalsRow)
})

console.log(totalsRows)
