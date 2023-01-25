const express = require('express')
const router = express.Router()

const Venue = require('../models/venue')
const { handle404 } = require('../lib/custom-errors')

const { requireToken } = require('../config/auth')

// CREATE
// POST / shows
router.post('/shows', requireToken, (req, res, next) => {
    const venueId = req.body.show.venueId

    const show = req.body.show
    // adding an owner field
    show.owner = req.user._id

    // find the venue that I want to add the show to
    // once found push the show into the mongoose array
    // send status of 202 crated if success
    // next if failure
    Venue.findById(venueId)
      .then(handle404)
      .then(venue => {
        venue.shows.push(show)

        return venue.save()
      })
      .then(venue => {
        res.status(201).json({ venue: venue})
      })
      .catch(next)
})

// UPDATE
// PATCH /shows/:id
router.patch('/shows/:showId', (req, res, next) => {
    const venueId = req.body.show.venueId

    const show = req.body.show

    Venue.findById(venueId)
        .then(handle404)
        .then(venue => {
            const show = venue.shows.id(req.params.showId)

            show.set(showBody)


            return venue.save()
        })
        .then(() => res.sendStatus(204))
})

// DELETE
router.delete('/shows/:showId', (req, res, next) => {
    const venueId = req.body.show.venueId

    Venue.findById(venueId)
        .then(handle404)
        .then(venue => {
            venue.shows.id(req.params.showId).remove()

            // since I've modified I have to save
            venue.save()
        })
})

module.exports = router
