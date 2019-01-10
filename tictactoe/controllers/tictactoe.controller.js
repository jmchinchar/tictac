// We need to be able to access the Service 
//that we just created so let's pull that in

var TicTacToeService = require('../services/tictactoe.service.js');

// Make sure to save the context of 
//this module inside the _this variable

_this = this

exports.getTicTacToes = async function(req, res, next){

    // We're going to use ternary to check 
    //the existence of the query parameters
        
        var page = req.query.page ? req.query.page : 1
        var limit = req.query.limit ? req.query.limit : 10; 
    
        try{
        
            var tictactoes = await TicTacToeService.getTicTacToes({}, page, limit)
            console.log(tictactoes);
            
    // Return the tictactoes list with the appropriate 
    //HTTP Status Code and Message.
            
            return res.status(200).json({status: 200, data: tictactoes, message: "Succesfully TicTacToes Recieved"});
            
        }catch(e){
            
    //Return an Error Response Message 
    //with Code and the Error Message.
            
            return res.status(400).json({status: 400, message: e.message});
            
        }
    }


    exports.createTicTacToe = async function(req, res, next){

        // Note: Req.Body contains the form submit values.
    
        var tictactoe = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status
        }
    
        try{
            
    // Calling the Service function 
    //with the new object from the Request Body
        
            var createdTicTacToe = await TicTacToeService.createTicTacToe(tictactoe)
            return res.status(201).json({status: 201, data: createdTicTacToe, message: "Succesfully Created TicTacToe"})
        }catch(e){
            
    //Return an Error Response Message 
    //with Code and the Error Message.
            
    return res.status(400).json({status: 400, message: "TicTacToe Creation was Unsuccesfull, I am sorry :( "})
        }
    }
    
    exports.updateTicTacToe = async function(req, res, next){

        // Id is necessary for the update
    
        if(!req.body._id){
            return res.status(400).json({status: 400., message: "Id must be present"})
        }
    
        var id = req.body._id;
    
        console.log(req.body)
    
        var tictactoe = {
            id,
            title: req.body.title ? req.body.title : null,
            description: req.body.description ? req.body.description : null,
            status: req.body.status ? req.body.status : null
        }
    
        try{
            var updatedTicTacToe = await TicTacToeService.updateTicTacToe(tictactoe)
            return res.status(200).json({status: 200, data: updatedTicTacToe, message: "Succesfully Updated Tod"})
        }catch(e){
            return res.status(400).json({status: 400., message: e.message})
        }
    }

    exports.removeTicTacToe = async function(req, res, next){

        var id = req.params.id;
    
        try{
            var deleted = await TicTacToeService.deleteTicTacToe(id)
            return res.status(204).json({status:204, message: "Succesfully Tictactoe Deleted"})
        }catch(e){
            return res.status(400).json({status: 400, message: e.message})
        }
    
    }