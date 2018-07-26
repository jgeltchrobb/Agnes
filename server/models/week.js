const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Week = new Schema({
  date: Date,
  staff: [{
    staffID: String,
    paid: {type: Boolean, default: false},
    shifts: [{
      date: String,
      shiftCategory: String,
      publicHoliday: {type: Boolean, default: false},
      wayneShift: {type: Boolean, default: false},
      firstHalfID: String,
      secondHalfID: String,
      sleepOver: {type: String, default: false},
      start: {
        rostered: String,
        actual: String,
        timesheet: String,
        flag: {type: Boolean, default: false}
      },
      finish: {
        rostered: String,
        actual: String,
        timesheet: String,
        flag: {type: Boolean, default: false}
      }
    }]
  }]
})

module.exports = mongoose.model('Week', Week);
