import React from 'react'

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

export default week
