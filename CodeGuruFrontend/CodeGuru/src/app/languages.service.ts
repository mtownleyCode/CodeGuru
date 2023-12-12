import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Language } from './language';
import { Secret } from './Secret';

@Injectable({
  providedIn: 'root'
})
export class LanguagesService {

  secret: Secret = new Secret();
  baseUrl: string = this.secret.languagesUrl

  constructor(private http:HttpClient) { }

  GetLanguages():Observable<Language[]>{
    return this.http.get<Language[]>(this.baseUrl);
  }

}
