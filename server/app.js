const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const port = 4000

const app = express()

// Middleware
app.use(bodyParser.json())

// Routes
// app.use('/', timesheetRoutes, rosterRoutes, userRoutes)
app.use('/rosters', require('./routes/weeks'))
app.use('/users', require('./routes/users'))

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