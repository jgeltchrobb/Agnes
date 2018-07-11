const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PayRateCategories = new Schema({})

module.exports = mongoose.model('PayRateCategories', PayRateCategories);
