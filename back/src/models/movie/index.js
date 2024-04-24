const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    watched: {
        type: Boolean,
        required: true,
    },
    pictureUrl: {
        type: String,
        required: true,
    },
    creatorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('Movie', movieSchema, 'movies')