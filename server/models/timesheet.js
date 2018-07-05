const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Timesheet = new Schema({
  date: String,
  staffID: String,
  rosterID: String,
  approved: Boolean,
  shifts: [
    {
      category: String,
      hoursWorked: Number,
    }
  ]
})

module.exports = mongoose.model('Timesheet', Timesheet);