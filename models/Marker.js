const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const markerSchema = new Schema({
    markerName: {
        type: String,
        required: true,
    },
    xCoordinate: {
        type: String,
        required: true,
    },
    yCoordinate: {
        type: String,
        required: true,
    },
    loca: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    images: {
        type: [String],
        // required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    category1: {
        type: String,
        required: true,
    },
    category2: {
        type: String,
        required: true,
    },
    category3: {
        type: String,
        required: true,
    },
    poster: {
        type: String,
        required: false,
    },
    likes: {
        type: String,
        required: false,
    }

});


const Marker = mongoose.model('Marker', markerSchema);

module.exports = Marker;