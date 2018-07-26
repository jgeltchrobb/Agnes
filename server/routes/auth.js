const express = require('express');
const User = require('../models/user');
const passport = require('passport');
const router = express.Router();

const { requireJwt, register, signJwtForUser, login, isAdmin } = require('../middleware/auth')

router.use('/staff', requireJwt, isAdmin)

// router.get('/', (req, res) => {
//   res.send('Anyone can view this page!')
// })

router.get('/', requireJwt, (req, res) => {
  res.send('You have a valid token: ' + JSON.stringify(req.user.token))
})

router.post('/register', register, signJwtForUser)

router.post('/login', login, signJwtForUser)

router.get('/logout', (req, res) => {
  req.logout();
  res.sendStatus(200)
});

module.exports = router;
