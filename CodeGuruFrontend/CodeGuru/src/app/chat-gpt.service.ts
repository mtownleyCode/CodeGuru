import { Injectable } from '@angular/core';
import { Secret } from './Secret';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatGptService {
  secret: Secret = new Secret();
  baseUrl: string = this.secret.chatGptUrl

  constructor(private http: HttpClient) { }

  GetAnswer(prompt: string):Observable<string>{
    console.log(this.http.post<string>(this.baseUrl, prompt))
    return this.http.post<string>(this.baseUrl, prompt);
  }
  }
