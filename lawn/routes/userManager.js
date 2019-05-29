var express = require('express'), 
userManagerRouter = express.Router();
var userManagerController = require('../controller/userManagerController');

userManagerRouter.get('/userManager', (req, res, next) => {
    userManagerController.reset(req, res, next);
});

userManagerRouter.get('/verify', (req, res, next) => {
    userManagerController.verify(req, res, next);
});

module.exports = userManagerRouter;