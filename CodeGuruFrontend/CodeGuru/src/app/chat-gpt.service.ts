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
  baseUrl: string = "";
  
  constructor(private http:HttpClient) { }

  GetAnswer(chatGpt: chatGpt, urlToUse: string):Observable<chatGpt>{
    if (urlToUse === 'chatGpt'){
      this.baseUrl = this.secret.chatGptUrl
    }
    else{
      this.baseUrl = this.secret.newChatGpt
    }
    this.baseUrl = this.baseUrl + chatGpt;
    console.log(this.baseUrl)
    return this.http.post<chatGpt>(this.baseUrl, chatGpt);

  }
}
