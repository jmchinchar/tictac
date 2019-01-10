var express = require('express')

var router = express.Router()

// Getting the tictactoe Controller that we just created

var TicTacToeController = require('../../controllers/tictactoe.controller.js');


// Map each API to the Controller FUnctions

router.get('/', TicTacToeController.getTicTacToes)

router.post('/', TicTacToeController.createTicTacToe)

router.put('/', TicTacToeController.updateTicTacToe)

router.delete('/:id',TicTacToeController.removeTicTacToe)


// Export the Router

module.exports = router;