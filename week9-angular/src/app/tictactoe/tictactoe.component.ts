import { TictactoeService } from '../services/tictactoe.services';
import TicTacToe from '../models/tictactoe.models';
import { Component, OnInit, } from '@angular/core';

@Component({
  selector: 'app-tictactoe',
  templateUrl: './tictactoe.component.html',
  styleUrls: ['./tictactoe.component.scss']
})
export class TictactoeComponent implements OnInit {

  constructor(
    private tictactoeService: TictactoeService
  ) { }

  
  public newTictactoe: TicTacToe = new TicTacToe()

 
  tictactoesList: TicTacToe[];
  editTictactoes: TicTacToe[] = [];

  ngOnInit(): void {

  
    this.tictactoeService.getTicTacToes()
      .subscribe(tictactoes => {
       
        this.tictactoesList = tictactoes
        console.log(tictactoes)
      })
  }



create() {
  this.tictactoeService.createTictactoe(this.newTictactoe)
    .subscribe((res) => {
      this.tictactoesList.push(res.data)
      this.newTictactoe = new TicTacToe()
    })
}


editTictactoe(tictactoe: TicTacToe) {
  console.log(tictactoe)
   if(this.tictactoesList.includes(tictactoe)){
    if(!this.editTictactoes.includes(tictactoe)){
      this.editTictactoes.push(tictactoe)
    }else{
      this.editTictactoes.splice(this.editTictactoes.indexOf(tictactoe), 1)
      this.tictactoeService.editTictactoe(tictactoe).subscribe(res => {
        console.log('Update Succesful')
       }, err => {
          this.editTictactoe(tictactoe)
          console.error('Update Unsuccesful')
        })
      }
    }
  }
  doneTictactoe(tictactoe:TicTacToe){
    tictactoe.status = 'Done'
    this.tictactoeService.editTictactoe(tictactoe).subscribe(res => {
      console.log('Update Succesful')
    }, err => {
      this.editTictactoe(tictactoe)
      console.error('Update Unsuccesful')
    })
  }


  submitTictactoe(event, tictactoe:TicTacToe){
    if(event.keyCode ==13){
      this.editTictactoe(tictactoe)
    }
  }

  deleteTictactoe(tictactoe: TicTacToe) {
    this.tictactoeService.deleteTictactoe(tictactoe._id).subscribe(res => {
      this.tictactoesList.splice(this.tictactoesList.indexOf(tictactoe), 1);
    })
  }
}