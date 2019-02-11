var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var TicTacToeSchema = new mongoose.Schema({
    title: String,
    description: String,
    date: Date,
    status: String
})

TicTacToeSchema.plugin(mongoosePaginate)
const TicTacToe = mongoose.model('TicTacToe', TicTacToeSchema)

module.exports = TicTacToe;