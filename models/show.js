const mongoose = require('mongoose')

const showSchema = new mongoose.Schema({
    artist: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
    }
    }, 
    {
        timestamps: true
    }
)

module.exports = showSchema