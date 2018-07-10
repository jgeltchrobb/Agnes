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
      start: {
        rostered: String,
        actual: String,
        timesheet: Date,
        flag: {type: Boolean, default: false}
      },
      finish: {
        rostered: Number,
        actual: Number,
        timesheet: Date,
        flag: {type: Boolean, default: false}
      }
    }]
  }]
})

module.exports = mongoose.model('Week', Week);

