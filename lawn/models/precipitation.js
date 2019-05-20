var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var precipitationSchema = new Schema({
    precipitation: [{
        type: Number
    }]
});

module.exports = mongoose.model('Precipitation', precipitationSchema);