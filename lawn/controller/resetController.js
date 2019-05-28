var User = require('../models/user');

module.exports.reset = (req, res, next) => {
    var email = req.query.email;
    var token = req.query.token;

    User.findOne({ email: email })
    .then(user => {
        if(user.token === token) {
            
        } else {

        }
    });    
};