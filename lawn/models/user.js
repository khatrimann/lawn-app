var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportlocal = require('passport-local-mongoose');
var Address = require('../models/address');     // Here lawnSchema works as address

var UserSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    address: Address.schema,
});

UserSchema.plugin(passportlocal);

module.exports = mongoose.model('User', UserSchema);