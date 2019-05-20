var User = require('../models/user');
var passport = require('passport');
var Address = require('../models/address');
var authenticate = require('../authenticate');

module.exports.login = (req, res, next) => {
    var token = authenticate.getToken({ _id: req.user._id });
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({success: true, token: token, status: 'You are successfully logged in!'});   
};

module.exports.signup = function(req, res, next) {
var global_id;
    User.register(new User({username: req.body.username, firstname: req.body.firstname, lastname: req.body.lastname, address: null}), 
        req.body.password, (err, user) => {
            if(err) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.json({err: err});
            } else {
                var global_id = user._id;
                console.log(global_id);
                    user.address = new Address({
                        street: req.body.street,
                        city: req.body.city,
                        state: req.body.state,
                        zip: req.body.zip,
                        user: global_id,
                        lat: req.body.lat,
                        long: req.body.long
                    }, (err, address) => {
                            if(err) {
                                console.log(err);
                                return;
                            }
                            address.save((err, address) => {
                                if(err) {
                                    res.statusCode = 500;
                                    res.setHeader('Content-Type', 'application/json');
                                    res.json({err: err});
                                    return ;
                                }
                                console.log('created address');
                            });
                        });
                user.save((err, user) => {
                    if (err) {
                    console.log("second err");
                    res.statusCode = 500;
                    res.setHeader('Content-Type', 'application/json');
                    res.json({err: err});
                    return ;
                    }
                    passport.authenticate('local')(req, res, () => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json({success: true, status: 'Registration Successful!'});
                    });
                });
            }
        });
};

module.exports.checkJWT = function (req, res) {
    console.log(req);
  passport.authenticate('jwt', {session: false}, (err, user, info) => {
    console.log("entered");
    console.log(user);
    console.log(req.user);
    if (err)
      return next(err);
    
    if (!user) {
      console.log("User doesn't exists");
      res.statusCode = 401;
      res.setHeader('Content-Type', 'application/json');
      return res.json({status: 'JWT invalid!', success: false, err: info});
    }
    else {
      console.log("User exists");
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      return res.json({status: 'JWT valid!', success: true, user: user});

    }
  }) (req, res);
}