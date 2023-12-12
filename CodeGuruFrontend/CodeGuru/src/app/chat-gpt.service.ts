import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Secret } from './Secret';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatGPTService {
  secret: Secret = new Secret();
  baseUrl: string =  this.secret.chatGptUrl;
  constructor(private http:HttpClient) { }
  
  GetAnswer(queryInput: string):Observable<string>{
    this.baseUrl += queryInput;
    return this.http.post<string>(this.baseUrl, queryInput);
  }
}
