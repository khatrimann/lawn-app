var express = require('express');
var controller = require('../controller/userController');
var router = express.Router();
var passport = require('passport');
//var Lawn = require('../models/address');    // LawnSchema as lawn
var User = require('../models/user');
var mongoose = require('mongoose');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login', passport.authenticate('local'), (req, res, next) => {
  controller.login(req, res, next);
});

router.post('/signup', (req, res, next) => {
  controller.signup(req, res, next);
});

router.get('/checkJWTToken', (req, res) => {
  controller.checkJWT(req, res);
});

router.get('/:id', (req, res, next) => {
    User.aggregate([
        {
          $match: {
          _id: mongoose.Types.ObjectId(req.params.id)
          }
        },
        {
          $lookup: { 
            from: "lawns",
            localField: "_id",
            foreignField: "user",
            as: "lawns"
          }
        },
        // {
        //   $unwind: "$lawns"
        // },
        // {
        //   $lookup: { 
        //     from: "temperatures",
        //     localField: "lawns.temperature",
        //     foreignField: "_id",
        //     as: "temps"
        //   }
        // },
        // {
        //   $lookup: { 
        //     from: "precipitations",
        //     localField: "lawns.precipitation",
        //     foreignField: "_id",
        //     as: "precs"
        //   }
        // },
        // {
        //   $project: {
        //     _id: 1,
        //     lawns: 1,
        //     temps: 1,
        //     precs: 1,
        //   }
        // }
    ])
    .then(result => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({ lawns: result[0].lawns, address: result[0].address });
      });
});

module.exports = router;
