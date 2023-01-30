// require mongoose
const mongoose = require('mongoose')
const showSchema = require('./show')

// Getting the Schema from Mongoose
const Schema = mongoose.Schema

// Creating a new campaign Schema
const venueSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
        location: {
            city: {
                type: String,
                required: true,
            },
            stateOrProvince: {
                type: String,
                required: true,
            },
            country: {
                type: String,
                required: true,
            }
        },
        capacity: {
            type: Number,
            required: false,
        },
        typeOfShowsBooked: {
            type: String,
            required: false,
        },
        contact: {
            name: {
                type: String,
                required: false,
            },
            email: {
                type: String,
                required: false,
            },
            socialMediaLinks: {
                instagram: {
                    type: String,
                    required: false,
                },
                twitter: {
                    type: String,
                    required: false,
                },
                facebook: {
                    type: String,
                    required: false,
                }
            }
        },
		shows: [showSchema]
	},
	{
		timestamps: true,
	}
)

const Venue = mongoose.model('Venue', venueSchema)

// Exporting Venue model to use elsewhere
module.exports = Venue
