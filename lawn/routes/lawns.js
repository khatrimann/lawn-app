var express = require('express');
lawnRouter = express.Router();
var controller = require('../controller/lawnController');
var passport = require('passport');

lawnRouter.get('/:id', passport.authenticate('local'), (req, res, next) => {
    controller.fetchData(req, res, next);
});

lawnRouter.post('/:id', passport.authenticate('local'), (req, res, next) => {
    controller.addLawn(req, res, next);
});

module.exports = lawnRouter;