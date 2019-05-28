var User = require('../models/user');
var resetService = require('../services/mailService');

module.exports.reset = (req, res, next) => {
    var email = req.query.email;
    var token = req.query.token;

    User.findOne({ email: email })
    .then(user => {
        if(user.token === token) {
            token = crypto.randomBytes(32).toString('hex');
            user.resetToken = token;
            user.save();
            resetService.sendPasswordResetMail(user);
            res.send('sent');
        } else {
            res.json({ success: false, message: 'Invalid user!!' });
        }
    });    
};