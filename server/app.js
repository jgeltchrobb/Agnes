const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')

const port = 4000

const app = express()

// Middleware
app.use(bodyParser.json())

app.use('/', cors())

// Routes
// app.use('/', timesheetRoutes, rosterRoutes, userRoutes)
app.use('/rosters', require('./routes/weeks'))
app.use('/flags', require('./routes/flags'))
app.use('/users', require('./routes/users'))
app.use('/payRateCategories', require('./routes/payRateCategories'))
app.use('/entitlements', require('./routes/entitlements'))
app.use('/standardHours', require('./routes/standardHours'))
app.use('/timesheets', require('./routes/timesheets'))
app.use('/clock', require('./routes/clock'))


// Mongoose
mongoose.connect('mongodb://localhost/agnes', (err) => {
  if (err) {
    console.log('Error connecting to database', err);
  } else {
    console.log('Connected to database!');
  }
});


app.listen(port, () => {
  console.log('Server listening: ' + port + '...')
})
