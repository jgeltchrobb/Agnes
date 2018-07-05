const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const rosterRoutes = require('./routes/rosters')
const timesheetRoutes = require('./routes/timesheets')
const userRoutes = require('./routes/users')

const port = 4000

const app = express()

// Middleware
app.use(bodyParser.json())

// Routes
app.use('/', rosterRoutes, timesheetRoutes, userRoutes)

// Mongoose
mongoose.connect('mongodb://localhost/prac_react_db', (err) => {
  if (err) {
    console.log('Error connecting to database', err);
  } else {
    console.log('Connected to database!');
  }
});


app.listen(port, () => {
  console.log('Server listening: ' + port + '...')
})