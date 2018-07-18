const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Week = new Schema({
  date: String,
  staff: [{
    staffID: String,
    paid: {type: Boolean, default: false},
    shifts: [{
      date: Date,
      shiftCategory: String,
      publicHoliday: {type: Boolean, default: false},
      wayneShift: {type: Boolean, default: false},
      start: {
        rostered: Date,
        actual: Date,
        timesheet: Date,
        flag: {type: Boolean, default: false}
      },
      finish: {
        rostered: Date,
        actual: Date,
        timesheet: Date,
        flag: {type: Boolean, default: false}
      }
    }]
  }]
})

module.exports = mongoose.model('Week', Week);
