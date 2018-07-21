const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Flags = new Schema({
  flags:  [
            {
              staffID: String,
              date: String,
              rostered: Date,
              actual: Date,
              active: {type: Boolean, default: true},
            },
          ]
})

module.exports = mongoose.model('Flags', Flags);
