const express = require('express')
const router = express.Router()

const Show = require('../models/show')
const { handle404 } = require('../lib/custom-errors')

const { requireToken } = require('../config/auth')

// CREATE
// POST / shows
router.post('/shows', requireToken, (req, res, next) => {
    const showId = req.body.show.showId

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

// CREATE
// GET

router.get('/shows', requireToken, (req, res, next) => {
	Show.find()
		.then((shows) => {
			return shows.map((show) => show)
		})
		.then((shows) => res.status(200).json({ shows: shows }))
		.catch(next)
})

// UPDATE
// PATCH /shows/:id
router.patch('/shows/:id', (req, res, next) => {
	Show.findById(req.params.id)
		.then(handle404)
		.then((show) => {
			return show.updateOne(req.body.show)
		})
		.then(() => res.sendStatus(204))
		.catch(next)
})

// DELETE
router.delete('/shows/:showId', (req, res, next) => {
    const showId = req.body.show.venueId

    Show.findById(venueId)
        .then(handle404)
        .then(show => {
            venue.shows.id(req.params.showId).remove()

            // since I've modified I have to save
            venue.save()
        })
})

module.exports = router
