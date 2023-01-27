const express = require('express')
const router = express.Router()

const Venue = require('../models/venue')
const { handle404 } = require('../lib/custom-errors')
// const { requireToken } = require('../config/auth')

// CREATE
// POST / shows
// put requireToken back in once sign up is complete
router.post('/shows', (req, res, next) => {
    const venueId = req.body.show.venueId

    const show = req.body.show
    // adding an owner field
    // links show to user below
    // show.owner = req.user._id

    Venue.findById(venueId)
      .then(handle404)
      .then((venue) => {
        venue.shows.push(show)

        return venue.save()
    })

    .then((venue) => res.status(201).json({ venue: venue }))
    .catch(next)
})

// UPDATE
// PATCH /shows/:id
// put require token BACK in after
router.patch('/shows/:showId', (req, res, next) => {
	const venueId = req.body.show.venueId

	Venue.findById(venueId)
		.then(handle404)
		.then((venue) => {
			const show = venue.shows.id(req.params.showId)
			show.set(req.body.show)
			return venue.save()
		})
		.then(() => res.sendStatus(204))
		.catch(next)
})

// DESTROY
// DELETE /notes/:id
// put require token back IN
router.delete('/shows/:showId', (req, res, next) => {
	const venueId = req.body.show.venueId

	Venue.findById(venueId)
		.then(handle404)
		.then((venue) => {
			venue.shows.id(req.params.showId).remove()

			return venue.save()
		})
		.then(() => res.sendStatus(204))
		.catch(next)
})

module.exports = router