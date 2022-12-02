import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IText } from './textInterface';

@Injectable({
  providedIn: 'root',
})
export class TextService {
  private apiUrl: string = 'https://localhost:7059/api/';

  constructor(private httpClient: HttpClient) {}

  getTextById(id: number): Observable<IText> {
    return this.httpClient.get<IText>(this.apiUrl + 'text/' + id);
  }

  getAllText(): Observable<IText[]> {
    return this.httpClient.get<IText[]>(this.apiUrl + 'text/');
  }

  DeleteById(id: string): void {
    this.httpClient.delete(this.apiUrl + 'text/' + id);
  }

  InsertText(model: IText): void {
    this.httpClient.post(this.apiUrl + 'text/insert', model);
  }

  Update(model: IText): void {
    this.httpClient.put(this.apiUrl + 'text/', model);
  }
}
