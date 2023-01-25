const mongoose = require('mongoose')

const Schema = mongoose.Schema

const showSchema = new Schema({
    artist: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    }
    }, 
    {
        timestamps: true
    }
)

module.exports = showSchema