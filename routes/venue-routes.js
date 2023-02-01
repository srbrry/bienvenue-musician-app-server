// require Express
const express = require('express')
const { handle404 } = require('../lib/custom-errors')

// require the Model we just created
const Venue = require('../models/venue')

const { requireToken } = require('../config/auth')

// Creating a router for us to make paths on
const router = express.Router()

// INDEX
// GET /venues
router.get('/venues', requireToken, (req, res, next) => {
	Venue.find().populate('shows')
		.then((venues) => {
			return venues.map((venue) => venue)
		})
		.then((venues) => res.status(200).json({ venues: venues }))
		.catch(next)
})

// SHOW
// GET /venues/ID
router.get('/venues/:id', (req, res, next) => {
	// req.params.id will be set based on the `:id` in the route
	Venue.findById(req.params.id).populate('shows')
		.then(handle404)
		.then((venue) => {
			res.status(200).json({ venue: venue })
		})
		.catch(next)
})

// CREATE
// POST /venues
router.post('/venues', (req, res, next) => {
	Venue.create(req.body.venue)
		.then((venue) => {
			res.status(201).json({ venue: venue })
		})
		.catch(next)
})

// UPDATE
// PATCH /venues/5a7db6c74d55bc51bdf39793
router.patch('/venues/:id', (req, res, next) => {
	Venue.findById(req.params.id)
		.then(handle404)
		.then((venue) => {
			return venue.updateOne(req.body.venue)
		})
		.then(() => res.sendStatus(204))
		.catch(next)
})

// DELETE /venues/5a7db6c74d55bc51bdf39793
router.delete('/venues/:id', (req, res, next) => {
	Venue.findById(req.params.id)
		.then(handle404)
		.then((venue) => {
			venue.deleteOne()
		})
		.then(() => res.sendStatus(204))
		.catch(next)
})

// exporting the router to use elsewhere
module.exports = router
