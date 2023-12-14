import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Secret } from './Secret';
import { Observable } from 'rxjs';
import { chatGpt } from './chatGpt';

@Injectable({
  providedIn: 'root'
})
export class ChatGPTService {

  secret: Secret = new Secret();
  baseUrl: string = this.secret.chatGptUrl
  
  constructor(private http:HttpClient) { }

  GetAnswer(chatGpt: chatGpt):Observable<chatGpt>{
    this.baseUrl = this.baseUrl + chatGpt;   
    return this.http.post<chatGpt>(this.baseUrl, chatGpt);

  }
}
