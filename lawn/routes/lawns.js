var express = require('express');
var lawnRouter = express.Router();
var controller = require('../controller/lawnController');
var passport = require('passport');
var authenticate = require('../authenticate');

lawnRouter.get('/:id', passport.authenticate('jwt'), authenticate.verifyUser, (req, res, next) => {
    controller.fetchData(req, res, next);
});

lawnRouter.post('/', passport.authenticate('jwt'), authenticate.verifyUser, (req, res, next) => {
    console.log(req);
    controller.addLawn(req, res, next);
});

module.exports = lawnRouter;