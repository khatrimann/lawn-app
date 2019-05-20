var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var temperatureSchema = new Schema({
    temperature: [{
        type: Number
    }]
});

module.exports = mongoose.model('Temperature', temperatureSchema);