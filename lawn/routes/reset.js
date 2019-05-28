var express = require('express'), 
resetRouter = express.Router();
var resetController = require('../controller/resetController');

resetRouter.get('/', (req, res, next) => {
    resetController.reset(req, res, next);
});

module.exports = resetRouter;