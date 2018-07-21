const express = require('express')
const Flags = require('../models/flags')
const router = express.Router()

// Get all flags
// This works well and is activated when click Rosters in the navbar
router.get('/', async (req, res) => {
  try {
    let flags = await Flags.find()
    res.send(flags)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// New flag
// Request comes from Timesheets.js in postFlag method
// Run by clicking on Timesheets in the navbar
router.put('/new', async (req, res) => {
  try {
    let flagID = req.body.flagObj
    console.log(flagObj)
    //  JORDAN - NEED TO SEARCH FLAGS ARRAY TO FIND OBJECT THAT MATCHES THE STAFFID AND ROSTERED TIME.
              // - If it exists do nothing, if not push it as per below
    await Flags.update( {}, { $push: { flags: req.body.flagObj } } )
    res.status(200).json({ confirmation: '...flag added' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Remove flag
// Request comes from Flag.js in removeFlag method
// Run by clicking the x button on the flag
router.put('/remove', async (req, res) => {
  try {
    let flagID = req.body.flagID
    console.log(flagID)
    // JORDAN - use the flag id to find it and delete it from the flags array. Please bra.. lol
    await flags.update( {}, )
    res.status(200).json({ confirmation: '...flag removed' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router
