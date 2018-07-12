const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Entitlements = new Schema({
  entitlements: []
})

module.exports = mongoose.model('Entitlements', Entitlements);
