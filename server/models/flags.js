const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Flags = new Schema({
  flags:  [
            {
              staffID: String,
              shiftID: String,
              date: String,
              startOrFinish: String,
              rostered: String,
              actual: String,
              active: {type: Boolean, default: true},
            },
          ]
})

module.exports = mongoose.model('Flags', Flags);
