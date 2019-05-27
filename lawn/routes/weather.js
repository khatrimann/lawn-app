var express = require('express');
var weatherRouter = express.Router();
var weatherControlller = require('../controller/weatherController');

weatherRouter.get('/', (req, res, next) => {
    weatherControlller.returnWeather(req, res);
});

module.exports = weatherRouter;