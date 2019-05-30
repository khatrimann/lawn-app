var express = require('express'), 
userManager = express.Router();
var userManagerController = require('../controller/userManagerController');

userManager.get('/reset', (req, res, next) => {
    userManagerController.reset(req, res, next);
});

userManager.get('/verify', (req, res, next) => {
    userManagerController.verify(req, res, next);
});

module.exports = userManager;