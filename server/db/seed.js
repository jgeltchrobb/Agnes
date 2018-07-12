const Week = require('../models/week')
const User = require('../models/user')
const mongoose = require('mongoose')
const PayRateCategories = require('../models/payRateCategories')
const Entitlements = require('../models/entitlements')
const StandardHours = require('../models/standardHours')

mongoose.connect('mongodb://localhost/agnes', (err) => {
  if (err) {
    console.log('Error connecting to database', err);
  } else {
    console.log('Connected to database!');
  }
});

const seedData = async () => {

  await Week.create({
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
    })

  await Week.create({
    date: new Date("July 9 2018"),
    staff:
    [
      {
        staffID: 1, shifts:
        [
          {
            date: new Date("July 15 2018"),
            shiftCategory: "floor",
            start: {
              rostered: new Date("July 15 2018 8:00"),
              actual: new Date("July 15 2018 8:00"),
              timesheet: '',
              flag: false
            },
            finish: {
              rostered: new Date("July 15 2018 16:00"),
              actual: new Date("July 15 2018 16:00"),
              timesheet: '',
              flag: false
            }
          }, // end of saterday
        ], // end of shifts

      }, //end of staff member

      {
        staffID: 2, shifts:
        [
          {
            date: new Date("July 9 2018"),
            shiftCategory: "room",
            start: {
              rostered: new Date("July 9 2018 8:00"),
              actual: new Date("July 9 2018 9:00"),
              timesheet: '',
              flag: false
            },
            finish: {
              rostered: new Date("July 9 2018 16:00"),
              actual: new Date("July 9 2018 15:00"),
              timesheet: '',
              flag: false
            }
          }, // end of saterday
        ], // end of shifts
      }, // end of staff member

      {
        staffID: 3, shifts:
        [
          {
            date: new Date("July 10 2018"),
            shiftCategory: "floor",
            start: {
              rostered: new Date("July 10 2018 8:00"),
              actual: new Date("July 10 2018 7:00"),
              timesheet: '',
              flag: false
            },
            finish: {
              rostered: new Date("July 10 2018 16:00"),
              actual: new Date("July 10 2018 17:00"),
              timesheet: '',
              flag: false
            }
          }, // end of saterday
        ], // end of shifts
      }, // end of staff member

    ]
  })

  await Week.create({
    date: new Date("July 16 2018"),
    staff:
    [
      {
        staffID: 1, shifts:
        [
          {
            date: new Date("July 16 2018"),
            shiftCategory: "floor",
            start: {
              rostered: new Date("July 16 2018 8:00"),
              actual: new Date("July 16 2018 9:00"),
              timesheet: '',
              flag: false
            },
            finish: {
              rostered: new Date("July 16 2018 16:00"),
              actual: new Date("July 16 2018 15:00"),
              timesheet: '',
              flag: false
            }
          }, // end of saterday
        ], // end of shifts

      }, //end of staff member

      {
        staffID: 2, shifts:
        [
          {
            date: new Date("July 4 2018"),
            shiftCategory: "floor",
            start: {
              rostered: new Date("July 11 2018 8:00"),
              actual: new Date("July 11 2018 8:00"),
              timesheet: '',
              flag: false
            },
            finish: {
              rostered: new Date("July 11 2018 16:00"),
              actual: new Date("July 11 2018 16:00"),
              timesheet: '',
              flag: false
            }
          }, // end of saterday
        ], // end of shifts
      }, // end of staff member

      {
        staffID: 3, shifts:
        [
          {
            date: new Date("July 12 2018"),
            shiftCategory: "kitchen",
            start: {
              rostered: new Date("July 12 2018 8:00"),
              actual: new Date("July 12 2018 8:00"),
              timesheet: '',
              flag: false
            },
            finish: {
              rostered: new Date("July 12 2018 16:00"),
              actual: new Date("July 12 2018 16:00"),
              timesheet: '',
              flag: false
            }
          }, // end of saturday
        ], // end of shifts
      }, // end of staff member

    ]
  })

  await User.create({
    staffID: 1,
    email: 'test@test.com',
    role: 'staff',
    PIN: 1234
  })

  await User.create({
    staffID: 2,
    email: 'test@test.com',
    role: 'staff',
    PIN: 1234
  })

  await User.create({
    staffID: 3,
    email: 'test@test.com',
    role: 'staff',
    PIN: 1234
  })

  await PayRateCategories.create({
    payRateCategories:
    [
      'Ordinary','Sat', 'Sun', 'Night', 'Public Holiday', 'Wayne Ordinary',
      'Wayne Sat', 'Wayne Sun', 'Wayne Night', 'Wayne Public Holiday'
    ]
  })

  await Entitlements.create({
    entitlements:
    [
      'Annual Leave', 'Sick Leave', 'Long Service Leave', 'Sleep-over Bonus'
    ]
  })

  await StandardHours.create({
    staffID: '1',
    name: 'Greg',
    totalHours: '',
    categories: [
      {
        category: 'Ordinary',
        hoursWorked: 5
      },
      {
        category: 'Saturday',
        hoursWorked: 3
      },
      {
        category: 'Sunday',
        hoursWorked: 66
      },
      {
        category: 'Night',
        hoursWorked: 0
      },
      {
        category: 'Public Holiday',
        hoursWorked: 1
      },
      {
        category: 'Wayne Ordinary',
        hoursWorked: 1
      },
      {
        category: 'Wayne Saturday',
        hoursWorked: 4
      },
      {
        category: 'Wayne Sunday',
        hoursWorked: 22
      },
      {
        category: 'Wayne Night',
        hoursWorked: 11
      },
      {
        category: 'Wayne Public Holiday',
        hoursWorked: 0
      }
    ]
  })
  await StandardHours.create({
    staffID: '2',
    name: 'Jack',
    totalHours: '',
    categories: [
      {
        category: 'Ordinary',
        hoursWorked: 53
      },
      {
        category: 'Saturday',
        hoursWorked: 32
      },
      {
        category: 'Sunday',
        hoursWorked: 66
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
        hoursWorked: 1
      },
      {
        category: 'Wayne Saturday',
        hoursWorked: 4
      },
      {
        category: 'Wayne Sunday',
        hoursWorked: 2
      },
      {
        category: 'Wayne Night',
        hoursWorked: 1
      },
      {
        category: 'Wayne Public Holiday',
        hoursWorked: 1
      }
    ]
  })

  await mongoose.connection.close(() => {
    console.log('Disconnected from database!')
  })
}

seedData()
