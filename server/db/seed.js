const Week = require('../models/week')
const User = require('../models/user')
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/agnes', (err) => {
  if (err) {
    console.log('Error connecting to database', err);
  } else {
    console.log('Connected to database!');
  }
});

Week.create({
  date: new Date("July 2 2018"),
  staff:
  [
    {
      staffID: 1, shifts:
      [
        {
          date: new Date("July 2 2018"),
          shiftCategory: "floor",
          start: {
            rostered: new Date("July 2 2018 8:00"),
            actual: new Date("July 2 2018 9:00"),
            timesheet: '',
            flag: false
          },
          finish: {
            rostered: new Date("July 2 2018 16:00"),
            actual: new Date("July 2 2018 15:00"),
            timesheet: '',
            flag: false
          }
        },
        {
          date: new Date("July 3 2018"),
          shiftCategory: "room",
          start: {
            rostered: new Date("July 3 2018 8:00"),
            actual: new Date("July 3 2018 7:00"),
            timesheet: '',
            flag: false
          },
          finish: {
            rostered: new Date("July 3 2018 16:00"),
            actual: new Date("July 3 2018 17:00"),
            timesheet: '',
            flag: false
          }
        },
        {
          date: new Date("July 4 2018"),
          shiftCategory: "Kitchen",
          start: {
            rostered: new Date("July 4 2018 8:00"),
            actual: new Date("July 4 2018 8:00"),
            timesheet: '',
            flag: false
          },
          finish: {
            rostered: new Date("July 4 2018 16:00"),
            actual: new Date("July 4 2018 16:00"),
            timesheet: '',
            flag: false
          }
        },
        {
          date: new Date("July 5 2018"),
          shiftCategory: "floor",
          start: {
            rostered: new Date("July 5 2018 8:00"),
            actual: new Date("July 5 2018 8:00"),
            timesheet: '',
            flag: false
          },
          finish: {
            rostered: new Date("July 5 2018 16:00"),
            actual: new Date("July 5 2018 16:00"),
            timesheet: '',
            flag: false
          }
        },
        {
          date: new Date("July 6 2018"),
          shiftCategory: "room",
          start: {
            rostered: new Date("July 6 2018 8:00"),
            actual: new Date("July 6 2018 8:00"),
            timesheet: '',
            flag: false
          },
          finish: {
            rostered: new Date("July 6 2018 16:00"),
            actual: new Date("July 6 2018 16:00"),
            timesheet: '',
            flag: false
          }
        },
        {
          date: new Date("July 7 2018"),
          shiftCategory: "Kitchen",
          start: {
            rostered: new Date("July 7 2018 8:00"),
            actual: new Date("July 7 2018 8:00"),
            timesheet: '',
            flag: false
          },
          finish: {
            rostered: new Date("July 7 2018 16:00"),
            actual: new Date("July 7 2018 16:00"),
            timesheet: '',
            flag: false
          }
        },
        {
          date: new Date("July 8 2018"),
          shiftCategory: "floor",
          start: {
            rostered: new Date("July 8 2018 8:00"),
            actual: new Date("July 8 2018 8:00"),
            timesheet: '',
            flag: false
          },
          finish: {
            rostered: new Date("July 8 2018 16:00"),
            actual: new Date("July 8 2018 16:00"),
            timesheet: '',
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
          start: {
            rostered: new Date("July 2 2018 8:00"),
            actual: new Date("July 2 2018 9:00"),
            timesheet: '',
            flag: false
          },
          finish: {
            rostered: new Date("July 2 2018 16:00"),
            actual: new Date("July 2 2018 15:00"),
            timesheet: '',
            flag: false
          }
        },
        {
          date: new Date("July 3 2018"),
          shiftCategory: "kitchen",
          start: {
            rostered: new Date("July 3 2018 8:00"),
            actual: new Date("July 3 2018 7:00"),
            timesheet: '',
            flag: false
          },
          finish: {
            rostered: new Date("July 3 2018 16:00"),
            actual: new Date("July 3 2018 17:00"),
            timesheet: '',
            flag: false
          }
        },
        {
          date: new Date("July 4 2018"),
          shiftCategory: "floor",
          start: {
            rostered: new Date("July 4 2018 8:00"),
            actual: new Date("July 4 2018 8:00"),
            timesheet: '',
            flag: false
          },
          finish: {
            rostered: new Date("July 4 2018 16:00"),
            actual: new Date("July 4 2018 16:00"),
            timesheet: '',
            flag: false
          }
        },
        {
          date: new Date("July 5 2018"),
          shiftCategory: "room",
          start: {
            rostered: new Date("July 5 2018 8:00"),
            actual: new Date("July 5 2018 8:00"),
            timesheet: '',
            flag: false
          },
          finish: {
            rostered: new Date("July 5 2018 16:00"),
            actual: new Date("July 5 2018 16:00"),
            timesheet: '',
            flag: false
          }
        },
        {
          date: new Date("July 6 2018"),
          shiftCategory: "kitchen",
          start: {
            rostered: new Date("July 6 2018 8:00"),
            actual: new Date("July 6 2018 8:00"),
            timesheet: '',
            flag: false
          },
          finish: {
            rostered: new Date("July 6 2018 16:00"),
            actual: new Date("July 6 2018 16:00"),
            timesheet: '',
            flag: false
          }
        },
        {
          date: new Date("July 7 2018"),
          shiftCategory: "floor",
          start: {
            rostered: new Date("July 7 2018 8:00"),
            actual: new Date("July 7 2018 8:00"),
            timesheet: '',
            flag: false
          },
          finish: {
            rostered: new Date("July 7 2018 16:00"),
            actual: new Date("July 7 2018 16:00"),
            timesheet: '',
            flag: false
          }
        },
        {
          date: new Date("July 8 2018"),
          shiftCategory: "room",
          start: {
            rostered: new Date("July 8 2018 8:00"),
            actual: new Date("July 8 2018 8:00"),
            timesheet: '',
            flag: false
          },
          finish: {
            rostered: new Date("July 8 2018 16:00"),
            actual: new Date("July 8 2018 16:00"),
            timesheet: '',
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
          start: {
            rostered: new Date("July 2 2018 8:00"),
            actual: new Date("July 2 2018 9:00"),
            timesheet: '',
            flag: false
          },
          finish: {
            rostered: new Date("July 2 2018 16:00"),
            actual: new Date("July 2 2018 17:00"),
            timesheet: '',
            flag: false
          }
        },
        {
          date: new Date("July 3 2018"),
          shiftCategory: "floor",
          start: {
            rostered: new Date("July 3 2018 8:00"),
            actual: new Date("July 3 2018 7:00"),
            timesheet: '',
            flag: false
          },
          finish: {
            rostered: new Date("July 3 2018 16:00"),
            actual: new Date("July 3 2018 17:00"),
            timesheet: '',
            flag: false
          }
        },
        {
          date: new Date("July 4 2018"),
          shiftCategory: "room",
          start: {
            rostered: new Date("July 4 2018 8:00"),
            actual: new Date("July 4 2018 8:00"),
            timesheet: '',
            flag: false
          },
          finish: {
            rostered: new Date("July 4 2018 17:00"),
            actual: new Date("July 4 2018 16:00"),
            timesheet: '',
            flag: false
          }
        },
        {
          date: new Date("July 5 2018"),
          shiftCategory: "kitchen",
          start: {
            rostered: new Date("July 5 2018 8:00"),
            actual: new Date("July 5 2018 8:00"),
            timesheet: '',
            flag: false
          },
          finish: {
            rostered: new Date("July 5 2018 16:00"),
            actual: new Date("July 5 2018 16:00"),
            timesheet: '',
            flag: false
          }
        },
        {
          date: new Date("July 6 2018"),
          shiftCategory: "floor",
          start: {
            rostered: new Date("July 6 2018 8:00"),
            actual: new Date("July 6 2018 8:00"),
            timesheet: '',
            flag: false
          },
          finish: {
            rostered: new Date("July 6 2018 16:00"),
            actual: new Date("July 6 2018 16:00"),
            timesheet: '',
            flag: false
          }
        },
        {
          date: new Date("July 7 2018"),
          shiftCategory: "room",
          start: {
            rostered: new Date("July 7 2018 8:00"),
            actual: new Date("July 7 2018 8:00"),
            timesheet: '',
            flag: false
          },
          finish: {
            rostered: new Date("July 7 2018 18:00"),
            actual: new Date("July 7 2018 19:00"),
            timesheet: '',
            flag: false
          }
        },
        {
          date: new Date("July 8 2018"),
          shiftCategory: "kitchen",
          start: {
            rostered: new Date("July 8 2018 8:00"),
            actual: new Date("July 8 2018 8:00"),
            timesheet: '',
            flag: false
          },
          finish: {
            rostered: new Date("July 8 2018 16:00"),
            actual: new Date("July 8 2018 16:00"),
            timesheet: '',
            flag: false
          }
        }, // end of saterday
      ] // end of shifts
    }, // end of staff member

  ]
}).then(() => {
  for (let i = 1; i < 4; i++) {
    console.log(i)
    User.create({
      staffID: i,
      email: 'test@test.com',
      role: 'staff',
      PIN: 1234
    })
  }
}).then(() => {
  mongoose.connection.close()
})

