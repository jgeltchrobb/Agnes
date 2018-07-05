const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Roster = new Schema({
  date: String,
  staff: [{
    staffID: String,
    shifts: [{
      day: String,
      date: String,
      shiftCategory: String,
      start: {
        rostered: Number,
        actual: Number,
        flag: Boolean
      },
      finish: {
        rostered: Number,
        actual: Number,
        flag: Boolean
      }
    }]
  }]
})

module.exports = mongoose.model('Roster', Roster);

