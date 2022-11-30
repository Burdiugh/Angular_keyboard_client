import { HttpClient } from '@angular/common/http';
import { ReturnStatement } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IScore } from './IScore';



@Injectable({
  providedIn: 'root'
})
export class ScoreService {
  private apiUrl: string = 'https://localhost:7059/api/';

  constructor(
    private httpClient: HttpClient,
  ) {}


  addScore(model:IScore): Observable<any>{
    return this.httpClient.post<IScore>(this.apiUrl+"score",model);
  }

  getScore(id:number):Observable<IScore>{
 return this.httpClient.get<IScore>(this.apiUrl+"score/"+id);
  }

  getAllScores():Observable<IScore>{
    return this.httpClient.get<IScore>(this.apiUrl+"score");
  }

}
