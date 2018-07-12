const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StandardHours = new Schema({
  staffID: String,
  name: String,
  totalHours: Number,
  categories: [{
    category: String,
    hoursWorked: Number
  }]
})

module.exports = mongoose.model('StandardHours', StandardHours);

