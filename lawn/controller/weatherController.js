var weather = require('openweather-apis');
var apiKey = require('../config').apiKey;

module.exports.returnWeather = (req, res) => {
    weather.setLang('en');
    weather.setCoordinate(req.query.x, req.query.y);
    weather.setUnits('metric');
    weather.setAPPID(apiKey);

    weather.getAllWeather(function(err, JSONObj){
        console.log(JSONObj);
        res.json(JSONObj);
    });

};


