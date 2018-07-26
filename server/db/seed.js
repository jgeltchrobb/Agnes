const Week = require('../models/week')
const User = require('../models/user')
const Flags = require('../models/flags')
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

  let user1 = await User.create({
    name: 'Pubert Gesepi',
    email: 'test@test.com',
    role: 'staff',
    PIN: 1111
  })

  let user2 = await User.create({
    name: 'Shaun Lamb',
    email: 'test@test.com',
    role: 'staff',
    PIN: 2222
  })

  let user3 = await User.create({
    name: 'Justin Case',
    email: 'test@test.com',
    role: 'staff',
    PIN: 3333
  })

  await Flags.create({
    flags:
      []
  })


  await Week.create({
    date: new Date('2018-06-11'),
    staff:  [
              { staffID: user1._id, shifts: [] },
              { staffID: user2._id, shifts: [] },
              { staffID: user3._id, shifts: [] },
            ]
  })
  await Week.create({
    date: new Date('2018-06-18'),
    staff:  [
              { staffID: user1._id, shifts: [] },
              { staffID: user2._id, shifts: [] },
              { staffID: user3._id, shifts: [] },
            ]
  })
  await Week.create({
    date: new Date('2018-06-25'),
    staff:  [
              { staffID: user1._id, shifts: [] },
              { staffID: user2._id, shifts: [] },
              { staffID: user3._id, shifts: [] },
            ]
  })
  await Week.create({
    date: new Date('2018-07-02'),
    staff:  [
              { staffID: user1._id, shifts: [] },
              { staffID: user2._id, shifts: [] },
              { staffID: user3._id, shifts: [] },
            ]
  })
  await Week.create({
    date: new Date('2018-07-09'),
    staff:  [
              { staffID: user1._id, shifts: [] },
              { staffID: user2._id, shifts: [] },
              { staffID: user3._id, shifts: [] },
            ]
  })
  await Week.create({
    date: new Date('2018-07-16'),
    staff:  [
              { staffID: user1._id, shifts: [] },
              { staffID: user2._id, shifts: [] },
              { staffID: user3._id, shifts: [] },
            ]
  })
  await Week.create({
    date: new Date('2018-07-23'),
    staff:  [
              { staffID: user1._id, shifts: [] },
              { staffID: user2._id, shifts: [] },
              { staffID: user3._id, shifts: [] },
            ]
  })
  //
  // await Week.create({
  //   date: '2018-07-09',
  //   staff:
  //   [
  //     {
  //       staffID: user1._id, shifts:
  //       [
  //         {
  //           date: new Date("July 15 2018").toISOString().split('T')[0],
  //           shiftCategory: "floor",
  //           start:  {
  //                       rostered: new Date("July 15 2018 8:00"),
  //                       actual: new Date("July 15 2018 8:00"),
  //                       timesheet: new Date("July 15 2018 8:00"),
  //                       flag: false
  //                   },
  //           finish: {
  //                       rostered: new Date("July 15 2018 16:00"),
  //                       actual: new Date("July 15 2018 16:00"),
  //                       timesheet: new Date("July 15 2018 16:00"),
  //                       flag: false
  //                   }
  //         },
  //       ], // end of shifts
  //
  //     }, //end of staff member
  //
  //     {
  //       staffID: user2._id, shifts:
  //       [
  //         {
  //           date: new Date("July 9 2018").toISOString().split('T')[0],
  //           shiftCategory: "room",
  //           start:  {
  //                     rostered: new Date("July 9 2018 8:00"),
  //                     actual: new Date("July 9 2018 9:00"),
  //                     timesheet: '',
  //                     flag: false
  //                   },
  //           finish: {
  //             rostered: new Date("July 9 2018 16:00"),
  //             actual: new Date("July 9 2018 15:00"),
  //             timesheet: '',
  //             flag: false
  //                   }
  //         },
  //       ], // end of shifts
  //     }, // end of staff member
  //
  //     {
  //       staffID: user3._id, shifts:
  //       [
  //         {
  //           date: new Date("July 10 2018").toISOString().split('T')[0],
  //           shiftCategory: "floor",
  //           start:  {
  //                     rostered: new Date("July 10 2018 8:00"),
  //                     actual: new Date("July 10 2018 7:00"),
  //                     timesheet: '',
  //                     flag: false
  //                   },
  //           finish: {
  //                     rostered: new Date("July 10 2018 16:00"),
  //                     actual: new Date("July 10 2018 17:00"),
  //                     timesheet: '',
  //                     flag: false
  //                   }
  //         },
  //       ], // end of shifts
  //     }, // end of staff member
  //
  //   ]
  // })
  //
  // await Week.create({
  //     date: '2018-07-02',
  //     staff:
  //     [
  //       {
  //         staffID: user1._id, shifts:
  //         [
  //           {
  //             date: new Date("July 02 2018"),
  //             shiftCategory: "floor",
  //             start: {
  //               rostered: new Date("July 02 2018 8:00"),
  //               actual: new Date("July 02 2018 9:00"),
  //               timesheet: new Date("July 02 2018 9:00"),
  //               flag: true
  //             },
  //             finish: {
  //               rostered: new Date("July 02 2018 16:00"),
  //               actual: '',
  //               timesheet: '',
  //               flag: true
  //             }
  //           },
  //           {
  //             date: new Date("July 02 2018"),
  //             shiftCategory: "bludge",
  //             start: {
  //               rostered: new Date("July 02 2018 22:00"),
  //               actual: '',
  //               timesheet: '',
  //               flag: false
  //             },
  //             finish: {
  //               rostered: new Date("July 03 2018 06:00"),
  //               actual: '',
  //               timesheet: '',
  //               flag: false
  //             }
  //           },
  //           {
  //             date: new Date("July 03 2018"),
  //             shiftCategory: "room",
  //             start: {
  //               rostered: new Date("July 03 2018 08:00"),
  //               actual: '',
  //               timesheet: '',
  //               flag: false
  //             },
  //             finish: {
  //               rostered: new Date("July 03 2018 16:00"),
  //               actual: '',
  //               timesheet: '',
  //               flag: false
  //             }
  //           },
  //           {
  //             date: new Date("July 03 2018"),
  //             shiftCategory: "digging",
  //             start: {
  //               rostered: new Date("July 03 2018 16:00"),
  //               actual: '',
  //               timesheet: '',
  //               flag: false
  //             },
  //             finish: {
  //               rostered: new Date("July 03 2018 19:00"),
  //               actual: '',
  //               timesheet: '',
  //               flag: false
  //             }
  //           },
  //           {
  //             date: new Date("July 4 2018"),
  //             shiftCategory: "Kitchen",
  //             start: {
  //               rostered: new Date("July 4 2018 8:00"),
  //               actual: new Date("July 4 2018 8:00"),
  //               timesheet: new Date("July 4 2018 8:00"),
  //               flag: false
  //             },
  //             finish: {
  //               rostered: new Date("July 4 2018 16:00"),
  //               actual: new Date("July 4 2018 16:00"),
  //               timesheet: new Date("July 4 2018 16:00"),
  //               flag: false
  //             }
  //           },
  //           {
  //             date: new Date("July 5 2018"),
  //             shiftCategory: "floor",
  //             start: {
  //               rostered: new Date("July 5 2018 8:00"),
  //               actual: new Date("July 5 2018 8:00"),
  //               timesheet: new Date("July 5 2018 8:00"),
  //               flag: false
  //             },
  //             finish: {
  //               rostered: new Date("July 5 2018 16:00"),
  //               actual: new Date("July 5 2018 16:00"),
  //               timesheet: new Date("July 5 2018 16:00"),
  //               flag: false
  //             }
  //           },
  //           {
  //             date: new Date("July 6 2018"),
  //             shiftCategory: "room",
  //             start: {
  //               rostered: new Date("July 6 2018 8:00"),
  //               actual: new Date("July 6 2018 8:00"),
  //               timesheet: '',
  //               flag: false
  //             },
  //             finish: {
  //               rostered: new Date("July 6 2018 16:00"),
  //               actual: new Date("July 6 2018 16:00"),
  //               timesheet: '',
  //               flag: false
  //             }
  //           },
  //           {
  //             date: new Date("July 7 2018"),
  //             shiftCategory: "Kitchen",
  //             start: {
  //               rostered: new Date("July 7 2018 8:00"),
  //               actual: new Date("July 7 2018 8:00"),
  //               timesheet: '',
  //               flag: false
  //             },
  //             finish: {
  //               rostered: new Date("July 7 2018 16:00"),
  //               actual: new Date("July 7 2018 16:00"),
  //               timesheet: '',
  //               flag: false
  //             }
  //           },
  //           {
  //             date: new Date("July 8 2018"),
  //             shiftCategory: "floor",
  //             start: {
  //               rostered: new Date("July 8 2018 8:00"),
  //               actual: new Date("July 8 2018 8:00"),
  //               timesheet: '',
  //               flag: false
  //             },
  //             finish: {
  //               rostered: new Date("July 8 2018 16:00"),
  //               actual: new Date("July 8 2018 16:00"),
  //               timesheet: '',
  //               flag: false
  //             }
  //           }, // end of saterday
  //         ] // end of shifts
  //
  //       }, //end of staff member
  //
  //       {
  //         staffID: user2._id, shifts:
  //         [
  //           {
  //             date: new Date("July 2 2018").toISOString().split('T')[0],
  //             shiftCategory: "room",
  //             start: {
  //               rostered: new Date("July 2 2018 8:00"),
  //               actual: new Date("July 2 2018 9:00"),
  //               timesheet: new Date("July 2 2018 9:00"),
  //               flag: true
  //             },
  //             finish: {
  //               rostered: new Date("July 2 2018 16:00"),
  //               actual: new Date("July 2 2018 15:00"),
  //               timesheet: new Date("July 2 2018 15:00"),
  //               flag: true
  //             }
  //           },
  //           {
  //             date: new Date("July 3 2018").toISOString().split('T')[0],
  //             shiftCategory: "kitchen",
  //             start: {
  //               rostered: new Date("July 3 2018 8:00"),
  //               actual: new Date("July 3 2018 7:00"),
  //               timesheet: new Date("July 3 2018 8:00"),
  //               flag: false
  //             },
  //             finish: {
  //               rostered: new Date("July 3 2018 16:00"),
  //               actual: new Date("July 3 2018 17:00"),
  //               timesheet: new Date("July 3 2018 16:00"),
  //               flag: false
  //             }
  //           },
  //           {
  //             date: new Date("July 4 2018").toISOString().split('T')[0],
  //             shiftCategory: "floor",
  //             start: {
  //               rostered: new Date("July 4 2018 8:00"),
  //               actual: new Date("July 4 2018 8:00"),
  //               timesheet: '',
  //               flag: false
  //             },
  //             finish: {
  //               rostered: new Date("July 4 2018 16:00"),
  //               actual: new Date("July 4 2018 16:00"),
  //               timesheet: '',
  //               flag: false
  //             }
  //           },
  //           {
  //             date: new Date("July 5 2018").toISOString().split('T')[0],
  //             shiftCategory: "room",
  //             start: {
  //               rostered: new Date("July 5 2018 8:00"),
  //               actual: new Date("July 5 2018 8:00"),
  //               timesheet: '',
  //               flag: false
  //             },
  //             finish: {
  //               rostered: new Date("July 5 2018 16:00"),
  //               actual: new Date("July 5 2018 16:00"),
  //               timesheet: '',
  //               flag: false
  //             }
  //           },
  //           {
  //             date: new Date("July 6 2018").toISOString().split('T')[0],
  //             shiftCategory: "kitchen",
  //             start: {
  //               rostered: new Date("July 6 2018 8:00"),
  //               actual: new Date("July 6 2018 8:00"),
  //               timesheet: '',
  //               flag: false
  //             },
  //             finish: {
  //               rostered: new Date("July 6 2018 16:00"),
  //               actual: new Date("July 6 2018 16:00"),
  //               timesheet: '',
  //               flag: false
  //             }
  //           },
  //           {
  //             date: new Date("July 7 2018").toISOString().split('T')[0],
  //             shiftCategory: "floor",
  //             start: {
  //               rostered: new Date("July 7 2018 8:00"),
  //               actual: new Date("July 7 2018 8:00"),
  //               timesheet: '',
  //               flag: false
  //             },
  //             finish: {
  //               rostered: new Date("July 7 2018 16:00"),
  //               actual: new Date("July 7 2018 16:00"),
  //               timesheet: '',
  //               flag: false
  //             }
  //           },
  //           {
  //             date: new Date("July 8 2018").toISOString().split('T')[0],
  //             shiftCategory: "room",
  //             start: {
  //               rostered: new Date("July 8 2018 8:00"),
  //               actual: new Date("July 8 2018 8:00"),
  //               timesheet: '',
  //               flag: false
  //             },
  //             finish: {
  //               rostered: new Date("July 8 2018 16:00"),
  //               actual: new Date("July 8 2018 16:00"),
  //               timesheet: '',
  //               flag: false
  //             }
  //           }, // end of saterday
  //         ] // end of shifts
  //       }, // end of staff member
  //
  //       {
  //         staffID: user3._id, shifts:
  //         [
  //           {
  //             date: new Date("July 2 2018").toISOString().split('T')[0],
  //             shiftCategory: "kitchen",
  //             start: {
  //               rostered: new Date("July 2 2018 8:00"),
  //               actual: new Date("July 2 2018 9:00"),
  //               timesheet: new Date("July 2 2018 9:00"),
  //               flag: true
  //             },
  //             finish: {
  //               rostered: new Date("July 2 2018 16:00"),
  //               actual: new Date("July 2 2018 17:00"),
  //               timesheet: new Date("July 2 2018 16:00"),
  //               flag: false
  //             }
  //           },
  //           {
  //             date: new Date("July 3 2018").toISOString().split('T')[0],
  //             shiftCategory: "floor",
  //             start: {
  //               rostered: new Date("July 3 2018 8:00"),
  //               actual: new Date("July 3 2018 7:00"),
  //               timesheet: new Date("July 3 2018 8:00"),
  //               flag: false
  //             },
  //             finish: {
  //               rostered: new Date("July 3 2018 16:00"),
  //               actual: new Date("July 3 2018 17:00"),
  //               timesheet: new Date("July 3 2018 16:00"),
  //               flag: false
  //             }
  //           },
  //           {
  //             date: new Date("July 4 2018").toISOString().split('T')[0],
  //             shiftCategory: "room",
  //             start: {
  //               rostered: new Date("July 4 2018 8:00"),
  //               actual: new Date("July 4 2018 8:00"),
  //               timesheet: '',
  //               flag: false
  //             },
  //             finish: {
  //               rostered: new Date("July 4 2018 17:00"),
  //               actual: new Date("July 4 2018 16:00"),
  //               timesheet: '',
  //               flag: false
  //             }
  //           },
  //           {
  //             date: new Date("July 5 2018").toISOString().split('T')[0],
  //             shiftCategory: "kitchen",
  //             start: {
  //               rostered: new Date("July 5 2018 8:00"),
  //               actual: new Date("July 5 2018 8:00"),
  //               timesheet: '',
  //               flag: false
  //             },
  //             finish: {
  //               rostered: new Date("July 5 2018 16:00"),
  //               actual: new Date("July 5 2018 16:00"),
  //               timesheet: '',
  //               flag: false
  //             }
  //           },
  //           {
  //             date: new Date("July 6 2018").toISOString().split('T')[0],
  //             shiftCategory: "floor",
  //             start: {
  //               rostered: new Date("July 6 2018 8:00"),
  //               actual: new Date("July 6 2018 8:00"),
  //               timesheet: '',
  //               flag: false
  //             },
  //             finish: {
  //               rostered: new Date("July 6 2018 16:00"),
  //               actual: new Date("July 6 2018 16:00"),
  //               timesheet: '',
  //               flag: false
  //             }
  //           },
  //           {
  //             date: new Date("July 7 2018").toISOString().split('T')[0],
  //             shiftCategory: "room",
  //             start: {
  //               rostered: new Date("July 7 2018 8:00"),
  //               actual: new Date("July 7 2018 8:00"),
  //               timesheet: '',
  //               flag: false
  //             },
  //             finish: {
  //               rostered: new Date("July 7 2018 18:00"),
  //               actual: new Date("July 7 2018 19:00"),
  //               timesheet: '',
  //               flag: false
  //             }
  //           },
  //           {
  //             date: new Date("July 8 2018").toISOString().split('T')[0],
  //             shiftCategory: "kitchen",
  //             start: {
  //               rostered: new Date("July 8 2018 8:00"),
  //               actual: new Date("July 8 2018 8:00"),
  //               timesheet: '',
  //               flag: false
  //             },
  //             finish: {
  //               rostered: new Date("July 8 2018 16:00"),
  //               actual: new Date("July 8 2018 16:00"),
  //               timesheet: '',
  //               flag: false
  //             }
  //           }, // end of saterday
  //         ] // end of shifts
  //       }, // end of staff member
  //
  //     ]
  //   })
  //
  // await Week.create({
  //   date: '2018-06-25',
  //   staff:
  //   [
  //     {
  //       staffID: user1._id, shifts:
  //       [
  //         {
  //           date: new Date("June 25 2018").toISOString().split('T')[0],
  //           shiftCategory: "floor",
  //           start:  {
  //                       rostered: new Date("June 25 2018 8:00"),
  //                       actual: new Date("June 25 2018 8:00"),
  //                       timesheet: new Date("June 25 2018 8:00"),
  //                       flag: false
  //                   },
  //           finish: {
  //                       rostered: new Date("June 25 2018 16:00"),
  //                       actual: new Date("June 25 2018 16:00"),
  //                       timesheet: new Date("June 25 2018 16:00"),
  //                       flag: false
  //                   }
  //         },
  //       ], // end of shifts
  //
  //     }, //end of staff member
  //
  //     {
  //       staffID: user2._id, shifts:
  //       [
  //         {
  //           date: new Date("June 26 2018").toISOString().split('T')[0],
  //           shiftCategory: "room",
  //           start:  {
  //                     rostered: new Date("June 26 2018 8:00"),
  //                     actual: new Date("June 26 2018 9:00"),
  //                     timesheet: new Date("June 26 2018 9:00"),
  //                     flag: true
  //                   },
  //           finish: {
  //                     rostered: new Date("June 26 2018 16:00"),
  //                     actual: new Date("June 26 2018 15:00"),
  //                     timesheet: new Date("June 26 2018 15:00"),
  //                     flag: true
  //                   }
  //         },
  //       ], // end of shifts
  //     }, // end of staff member
  //
  //     {
  //       staffID: user3._id, shifts:
  //       [
  //         {
  //           date: new Date("June 27 2018").toISOString().split('T')[0],
  //           shiftCategory: "floor",
  //           start:  {
  //                     rostered: new Date("June 27 2018 8:00"),
  //                     actual: new Date("June 27 2018 7:00"),
  //                     timesheet: '',
  //                     flag: false
  //                   },
  //           finish: {
  //                     rostered: new Date("June 27 2018 16:00"),
  //                     actual: new Date("June 27 2018 17:00"),
  //                     timesheet: '',
  //                     flag: false
  //                   }
  //         },
  //       ], // end of shifts
  //     }, // end of staff member
  //
  //   ]
  // })
  //
  // await Week.create({
  //   date: '2018-06-18',
  //   staff:
  //   [
  //     {
  //       staffID: user1._id, shifts:
  //       [
  //         {
  //           date: new Date("June 22 2018").toISOString().split('T')[0],
  //           shiftCategory: "floor",
  //           start:  {
  //                       rostered: new Date("June 22 2018 8:00"),
  //                       actual: new Date("June 22 2018 8:00"),
  //                       timesheet: new Date("June 22 2018 8:00"),
  //                       flag: false
  //                   },
  //           finish: {
  //                       rostered: new Date("June 22 2018 16:00"),
  //                       actual: new Date("June 22 2018 16:00"),
  //                       timesheet: new Date("June 22 2018 16:00"),
  //                       flag: false
  //                   }
  //         },
  //       ], // end of shifts
  //
  //     }, //end of staff member
  //
  //     {
  //       staffID: user2._id, shifts:
  //       [
  //         {
  //           date: new Date("June 23 2018").toISOString().split('T')[0],
  //           shiftCategory: "room",
  //           start:  {
  //                     rostered: new Date("June 23 2018 8:00"),
  //                     actual: new Date("June 23 2018 9:00"),
  //                     timesheet: '',
  //                     flag: false
  //                   },
  //           finish: {
  //             rostered: new Date("June 23 2018 16:00"),
  //             actual: new Date("June 23 2018 15:00"),
  //             timesheet: '',
  //             flag: false
  //                   }
  //         },
  //       ], // end of shifts
  //     }, // end of staff member
  //
  //     {
  //       staffID: user3._id, shifts:
  //       [
  //         {
  //           date: new Date("June 24 2018").toISOString().split('T')[0],
  //           shiftCategory: "floor",
  //           start:  {
  //                     rostered: new Date("June 24 2018 8:00"),
  //                     actual: new Date("June 24 2018 7:00"),
  //                     timesheet: '',
  //                     flag: false
  //                   },
  //           finish: {
  //                     rostered: new Date("June 24 2018 16:00"),
  //                     actual: new Date("June 24 2018 17:00"),
  //                     timesheet: '',
  //                     flag: false
  //                   }
  //         },
  //       ], // end of shifts
  //     }, // end of staff member
  //
  //   ]
  // })
  //
  // await Week.create({
  //   date: '2018-06-11',
  //   staff:
  //   [
  //     {
  //       staffID: user1._id, shifts:
  //       [
  //         {
  //           date: new Date("June 14 2018").toISOString().split('T')[0],
  //           shiftCategory: "floor",
  //           start:  {
  //                       rostered: new Date("June 14 2018 8:00"),
  //                       actual: new Date("June 14 2018 8:00"),
  //                       timesheet: new Date("June 14 2018 8:00"),
  //                       flag: false
  //                   },
  //           finish: {
  //                       rostered: new Date("June 14 2018 16:00"),
  //                       actual: new Date("June 14 2018 16:00"),
  //                       timesheet: new Date("June 14 2018 16:00"),
  //                       flag: false
  //                   }
  //         },
  //       ], // end of shifts
  //
  //     }, //end of staff member
  //
  //     {
  //       staffID: user2._id, shifts:
  //       [
  //         {
  //           date: new Date("June 15 2018").toISOString().split('T')[0],
  //           shiftCategory: "room",
  //           start:  {
  //                     rostered: new Date("June 15 2018 8:00"),
  //                     actual: new Date("June 15 2018 9:00"),
  //                     timesheet: '',
  //                     flag: false
  //                   },
  //           finish: {
  //             rostered: new Date("June 15 2018 16:00"),
  //             actual: new Date("June 15 2018 15:00"),
  //             timesheet: '',
  //             flag: false
  //                   }
  //         },
  //       ], // end of shifts
  //     }, // end of staff member
  //
  //     {
  //       staffID: user3._id, shifts:
  //       [
  //         {
  //           date: new Date("June 16 2018").toISOString().split('T')[0],
  //           shiftCategory: "floor",
  //           start:  {
  //                     rostered: new Date("June 16 2018 8:00"),
  //                     actual: new Date("June 16 2018 7:00"),
  //                     timesheet: '',
  //                     flag: false
  //                   },
  //           finish: {
  //                     rostered: new Date("June 16 2018 16:00"),
  //                     actual: new Date("June 16 2018 17:00"),
  //                     timesheet: '',
  //                     flag: false
  //                   }
  //         },
  //       ], // end of shifts
  //     }, // end of staff member
  //
  //   ]
  // })
  //
  // await Week.create({
  //   date: '2018-06-04',
  //   staff:
  //   [
  //     {
  //       staffID: user1._id, shifts:
  //       [
  //         {
  //           date: new Date("June 5 2018").toISOString().split('T')[0],
  //           shiftCategory: "floor",
  //           start:  {
  //                       rostered: new Date("June 5 2018 8:00"),
  //                       actual: new Date("June 5 2018 8:00"),
  //                       timesheet: new Date("June 5 2018 8:00"),
  //                       flag: false
  //                   },
  //           finish: {
  //                       rostered: new Date("June 5 2018 16:00"),
  //                       actual: new Date("June 5 2018 16:00"),
  //                       timesheet: new Date("June 5 2018 16:00"),
  //                       flag: false
  //                   }
  //         },
  //       ], // end of shifts
  //
  //     }, //end of staff member
  //
  //     {
  //       staffID: user2._id, shifts:
  //       [
  //         {
  //           date: new Date("June 6 2018").toISOString().split('T')[0],
  //           shiftCategory: "room",
  //           start:  {
  //                     rostered: new Date("June 6 2018 8:00"),
  //                     actual: new Date("June 6 2018 9:00"),
  //                     timesheet: '',
  //                     flag: false
  //                   },
  //           finish: {
  //             rostered: new Date("June 6 2018 16:00"),
  //             actual: new Date("June 6 2018 15:00"),
  //             timesheet: '',
  //             flag: false
  //                   }
  //         },
  //       ], // end of shifts
  //     }, // end of staff member
  //
  //     {
  //       staffID: user3._id, shifts:
  //       [
  //         {
  //           date: new Date("June 7 2018").toISOString().split('T')[0],
  //           shiftCategory: "floor",
  //           start:  {
  //                     rostered: new Date("June 7 2018 8:00"),
  //                     actual: new Date("June 7 2018 7:00"),
  //                     timesheet: '',
  //                     flag: false
  //                   },
  //           finish: {
  //                     rostered: new Date("June 7 2018 16:00"),
  //                     actual: new Date("June 7 2018 17:00"),
  //                     timesheet: '',
  //                     flag: false
  //                   }
  //         },
  //       ], // end of shifts
  //     }, // end of staff member
  //
  //   ]
  // })
  //
  // await Week.create({
  //   date: '2018-05-28',
  //   staff:
  //   [
  //     {
  //       staffID: user1._id, shifts:
  //       [
  //         {
  //           date: new Date("May 29 2018").toISOString().split('T')[0],
  //           shiftCategory: "floor",
  //           start:  {
  //                       rostered: new Date("May 29 2018 8:00"),
  //                       actual: new Date("May 29 2018 8:00"),
  //                       timesheet: new Date("May 29 2018 8:00"),
  //                       flag: false
  //                   },
  //           finish: {
  //                       rostered: new Date("May 29 2018 16:00"),
  //                       actual: new Date("May 29 2018 16:00"),
  //                       timesheet: new Date("May 29 2018 16:00"),
  //                       flag: false
  //                   }
  //         },
  //       ], // end of shifts
  //
  //     }, //end of staff member
  //
  //     {
  //       staffID: user2._id, shifts:
  //       [
  //         {
  //           date: new Date("May 30 2018").toISOString().split('T')[0],
  //           shiftCategory: "room",
  //           start:  {
  //                     rostered: new Date("May 30 2018 8:00"),
  //                     actual: new Date("May 30 2018 9:00"),
  //                     timesheet: '',
  //                     flag: false
  //                   },
  //           finish: {
  //             rostered: new Date("May 30 2018 16:00"),
  //             actual: new Date("May 30 2018 15:00"),
  //             timesheet: '',
  //             flag: false
  //                   }
  //         },
  //       ], // end of shifts
  //     }, // end of staff member
  //
  //     {
  //       staffID: user3._id, shifts:
  //       [
  //         {
  //           date: new Date("May 31 2018").toISOString().split('T')[0],
  //           shiftCategory: "floor",
  //           start:  {
  //                     rostered: new Date("May 31 2018 8:00"),
  //                     actual: new Date("May 31 2018 7:00"),
  //                     timesheet: '',
  //                     flag: false
  //                   },
  //           finish: {
  //                     rostered: new Date("May 31 2018 16:00"),
  //                     actual: new Date("May 31 2018 17:00"),
  //                     timesheet: '',
  //                     flag: false
  //                   }
  //         },
  //       ], // end of shifts
  //     }, // end of staff member
  //
  //   ]
  // })

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
    staffID: user1._id,
    name: user1.name,
    totalHours: '',
    categories: [
      {
        category: 'Ordinary',
        hoursWorked: 5
      },
      {
        category: 'Sat',
        hoursWorked: 3
      },
      {
        category: 'Sun',
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
    staffID: user2._id,
    name: user2.name,
    totalHours: '',
    categories: [
      {
        category: 'Ordinary',
        hoursWorked: 53
      },
      {
        category: 'Sat',
        hoursWorked: 32
      },
      {
        category: 'Sun',
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
  await StandardHours.create({
    staffID: user3._id,
    name: user3.name,
    totalHours: '',
    categories: [
      {
        category: 'Ordinary',
        hoursWorked: 3
      },
      {
        category: 'Sat',
        hoursWorked: 1
      },
      {
        category: 'Sun',
        hoursWorked: 4
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
        hoursWorked: 4
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

  await mongoose.connection.close(() => {
    console.log('Disconnected from database!')
  })
}

seedData()
