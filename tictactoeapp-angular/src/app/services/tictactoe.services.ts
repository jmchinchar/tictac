import TicTacToe from '../models/tictactoe.models';
import { Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {Response} from '@angular/http';
import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';

@Injectable()
export class TictactoeService {

  api_url = 'http://localhost:3000';
  tictactoeUrl = `${this.api_url}/api/tictactoes`;

  constructor(
    private http: HttpClient
  ) { }



createTictactoe(tictactoe: TicTacToe): Observable<any>{
    //returns the observable of http post request 
    return this.http.post(`${this.tictactoeUrl}`, tictactoe);
  }

  getTicTacToes(): Observable<TicTacToe[]>{
    return this.http.get(this.tictactoeUrl)
    .pipe(map(res  => {
      //Maps the response object sent from the server
        
      return res["data"].docs as TicTacToe[];
    }))
  }

  editTictactoe(tictactoe:TicTacToe){
    let editUrl = `${this.tictactoeUrl}`
    //returns the observable of http put request 
    return this.http.put(editUrl, tictactoe);
  }

  deleteTictactoe(id:string):any{
    //Delete the object by the id
    let deleteUrl = `${this.tictactoeUrl}/${id}`
    return this.http.delete(deleteUrl)
    .pipe(map(res  => {
      return res;
    }))
}

private handleError(error: any): Promise<any> {
  console.error('An error occurred', error); 
  // for demo purposes only
  return Promise.reject(error.message || error);
}
}







