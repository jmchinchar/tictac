// Access our newly created Mongoose Model
var TicTacToe = require('../models/tictactoe.model.js')

// Saving the context of this module inside the _the variable
_this = this

// Let's use an Async function to get the tictactoe
exports.getTicTacToes = async function(query, page, limit){

    // We also want to set up options for the mongoose paginate

    var options = {
        page,
        limit
    }

    //Let's create a Try and Catch function 
//that way we have some error handling set. 
//Waiting for the promise
    
try {
    var tictactoe = await TicTacToe.paginate(query, options)
    
//Once the Mongoose promise is returned 
//we're going to go ahead and return 
//the To Do List it has produced 

    return tictactoe;

} catch (e) {

//If the try didn't work we're going to 
//go ahead and let the users know what kind of 
//Error we have

    // throw Error('Oh No! We got an error while Paginating our Tic-tac-toe, so sorry!' )
    throw Error (e.message);

    }
}

exports.createTicTacToe = async function(tictactoe){
    
    // Creating a new Mongoose Object by using the new keyword
    
        var newTicTacToe = new TicTacToe({
            title: tictactoe.title,
            description: tictactoe.description,
            date: new Date(),
            status: tictactoe.status
        })
    
        try{
    
            // Let's go ahead and save the Tictactoe 
    
            var savedTicTacToe = await newTicTacToe.save()
    
            return savedTicTacToe;
        }catch(e){
          
            //if we can't create a tictactoe we want to throw an error 
    
            throw Error("Error while Creating tic-tac-toe")
        }
    }

    exports.updateTicToeToe = async function(tictactoe){
        var id = tictactoe.id
    
        try{
            //Find the old tictactoe Object by the Id
        
            var oldTicTacToe = await TicTacToe.findById(id);
        }catch(e){
            throw Error("Error occured while Finding the tictactoe")
        }
    
        // If no old tictactoe Object exists return false
    
        if(!oldTicTacToe){
            return false;
        }
    
        console.log(oldTicTacToe)
    
        //Edit the Tictactoe Object
    
        oldTicTacToe.title = tictactoe.title
        oldTicTacToe.description = tictactoe.description
        oldTicTacToe.status = tictactoe.status
    
    
        console.log(oldTicTacToe)
    
        try{
            var savedTicTacToe = await oldTicTacToe.save()
            return savedTicTacToe;
        }catch(e){
            throw Error("And Error occured while updating the TicTacToe");
        }
    }

    exports.deleteTicTacToe = async function(id){
    
        // Delete the TicTacToe
    
        try{
            var deleted = await TicTacToe.deleteOne({_id: id})
            if(deleted.n === 0){
                throw Error("TicTacToe Could not be deleted")
            }
            return deleted
        }catch(e){
            throw Error("Error Occured while Deleting the TicTacToe")
        }
    }