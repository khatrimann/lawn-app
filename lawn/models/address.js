var mongoose = require('mongoose');
var Schema = mongoose.Schema;
require('../models/user');
require('../models/temperature');
require('../models/precipitation');

var LawnSchema = new Schema({
    street: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    zip: {
        type: Number,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    lat: {
        type: Number,
        required: true
    },
    long: {
        type: Number,
        required: true
    },
    precipitation: {
        type: Schema.Types.ObjectId,
        ref: 'Precipitation'
    },
    temperature: {
        type: Schema.Types.ObjectId,
        ref: 'Temperature'
    }
});

module.exports = mongoose.model('Lawn', LawnSchema);