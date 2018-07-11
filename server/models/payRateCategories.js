const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PayRateCategories = new Schema({
  Ordinary: Number,
  Sat:  Number,
  Sun: Number,
  Night: Number,
  PublicHoliday: Number,
  WayneOrdinary: Number,
  WayneSat:  Number,
  WayneSun: Number,
  WayneNight: Number,
  WaynePublicHoliday: Number
})

module.exports = mongoose.model('PayRateCategories', PayRateCategories);
