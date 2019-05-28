var Lawns = require('../models/address');   // LawnSchema fetching lawn addresss
var mongoose = require('mongoose');
var Temperature = require('../models/temperature');
var Precipitation = require('../models/precipitation');
var { check, validationResult } = require('express-validator/check');


module.exports.fetchData = (req, res, next) => {
     Lawns.find({ _id: req.params.id})
     .populate('precipitation')
     .populate('temperature')
     .then(result => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(result);
     });
};

module.exports.addLawn = (req, res, next) => {
   if (check(req.body.street).isLength({ min: 1})  && check(req.body.city).isLength({ min: 1})  && check(req.body.state).isLength({ min: 1})  && check(req.body.zip).isLength({ min: 1})  && check(req.body.lat).isLength({ min: 1})  && check(req.body.long).isLength({ min: 1})  && check(req.body.user).isLength({ min: 1})  ){
      Lawns.create({
      street: req.body.street,
      city: req.body.city,
      state: req.body.state,
      zip: req.body.zip,
      lat: req.body.lat,
      long: req.body.long,
      user: mongoose.Types.ObjectId(req.body.user)
   }, (err, lawn) => {
      if (err) {
         console.log(err);
         res.json({ success: false, message: 'Unable to Register Lawn', err: err });
         return;
      }

      Precipitation.create({
         precipitation: req.body.precipitation
      }, (err, precipitation) => {
         if (err) {
            console.log(err);
            res.json({ success: false, message: 'Unable to Register Lawn', err: err });
            return;
         }
         console.log('precipitation id ' + precipitation._id);
         lawn.precipitation = precipitation._id;

         Temperature.create({
            temperature: req.body.temperature
         }, (err, temperature) => {
            if (err) {
               console.log(err);
               res.json({ success: false, message: 'Unable to Register Lawn', err: err });
               return;
            }
   
            console.log('temperature id ' + temperature._id);
            lawn.temperature = temperature._id;

            lawn.save((err, lawn) => {
               if(err) {
                   res.statusCode = 500;
                   res.setHeader('Content-Type', 'application/json');
                   res.json({ success: false, message: 'Unable to Register Lawn', err: err });
                   return ;

               }
               console.log('created lawn');
               res.json({ success: true, message: 'Registered Lawn' });
           });
         });

      });
   });
} else {
   res.json({ success: false, message: 'Unable to Register Lawn' });
}
};