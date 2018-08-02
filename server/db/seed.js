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

  // let user1 = await User.create({
  //   name: 'Pubert Gesepi',
  //   email: 'test@test.com',
  //   role: 'staff',
  //   PIN: 1111
  // })

  // let user2 = await User.create({
  //   name: 'Shaun Lamb',
  //   email: 'test@test.com',
  //   role: 'staff',
  //   PIN: 2222
  // })

  // let user3 = await User.create({
  //   name: 'Justin Case',
  //   email: 'test@test.com',
  //   role: 'staff',
  //   PIN: 3333
  // })

  await Flags.create({
    flags:
      []
  })


  await Week.create({
    date: new Date('2018-06-18'),
    staff:  []
  })
  await Week.create({
    date: new Date('2018-06-25'),
    staff:  []
  })
  await Week.create({
    date: new Date('2018-07-02'),
    staff:  []
  })
  await Week.create({
    date: new Date('2018-07-09'),
    staff:  []
  })
  await Week.create({
    date: new Date('2018-07-16'),
    staff:  []
  })
  await Week.create({
    date: new Date('2018-07-23'),
    staff:  []
  })
  await Week.create({
    date: new Date('2018-07-30'),
    staff:  []
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
      'Sleep-over Bonus', 'Annual Leave', 'Sick Leave', 'Long Service Leave'
    ]
  })

  await mongoose.connection.close(() => {
    console.log('Disconnected from database!')
  })
}

seedData()
