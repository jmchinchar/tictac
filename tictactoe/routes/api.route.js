var express = require('express')

var router = express.Router()
var tictactoes = require('./api/tictactoe.route')


router.use('/tictactoes', tictactoes);


module.exports = router;