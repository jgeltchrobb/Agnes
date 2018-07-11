const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PayRateCategories = new Schema({
  // Ordinary: Number,
  // Sat:  Number,
  // Sun: Number,
  // Night: Number,
  // Public Holiday: Number,
  // Wayne Ordinary: Number,
  // Wayne Sat:  Number,
  // Wayne Sun: Number,
  // Wayne Night: Number,
  // Wayne Public Holiday: Number
})

module.exports = mongoose.model('PayRateCategories', PayRateCategories);
