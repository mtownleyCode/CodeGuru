import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Secret } from './Secret';
<<<<<<< HEAD
=======
import { HttpClient, HttpHeaders } from '@angular/common/http';
>>>>>>> a9a9306c44ad16892f51b33384610afa7f0ac31e
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatGPTService {
<<<<<<< HEAD
  secret: Secret = new Secret();
  baseUrl: string =  this.secret.chatGptUrl;
  constructor(private http:HttpClient) { }
  
  GetAnswer(queryInput: string):Observable<string>{
    this.baseUrl += queryInput;
    return this.http.post<string>(this.baseUrl, queryInput);
=======

  secret: Secret = new Secret();
  baseUrl: string = this.secret.chatGptUrl
  
  constructor(private http:HttpClient) { }

  GetAnswer(prompt: string):Observable<string>{
    console.log("prompt" + prompt)
    this.baseUrl = this.baseUrl + prompt;   
    return this.http.post<string>(this.baseUrl, prompt);

>>>>>>> a9a9306c44ad16892f51b33384610afa7f0ac31e
  }
}
