const express = require('express')
const Flags = require('../models/flags')
const router = express.Router()

// Get all flags
router.get('/', async (req, res) => {
  try {
    let flags = await Flags.find()
    res.send(flags)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// New flag
router.put('/new', async (req, res) => {
  try {
    await Flags.update( {}, { $push: { flags: req.body.flagObj } } )
    res.status(200).json({ confirmation: 'flag was added' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})



// Remove flag
// router.put('/remove', async (req, res) => {
//   try {
//     let flags = await flags.update({ _id: req.params.id}, req.body)
//     res.status(200).json({ confirmation: 'flag was removed' })
//   } catch (error) {
//     res.status(500).json({ error: error.message })
//   }
// })

module.exports = router
