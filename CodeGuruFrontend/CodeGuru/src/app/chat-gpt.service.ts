import { Injectable } from '@angular/core';
import { Secret } from './Secret';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatGPTService {

  secret: Secret = new Secret();
  baseUrl: string = this.secret.chatGptUrl
  
  constructor(private http:HttpClient) { }

  GetAnswer(prompt: string):Observable<string>{
    console.log("prompt" + prompt)
    this.baseUrl = this.baseUrl + prompt;   
    return this.http.post<string>(this.baseUrl, prompt);

  }
}
