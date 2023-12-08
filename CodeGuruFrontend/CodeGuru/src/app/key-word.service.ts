import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { KeyWord } from './key-word';

@Injectable({
  providedIn: 'root'
})
export class KeyWordService {

  baseUrl : string = "https://localhost:7199/api/KeyWords"
  constructor(private http:HttpClient) { }

  GetUser():Observable<KeyWord>{
    return this.http.get<KeyWord>(this.baseUrl);
  }
  AddUser(newKeyWord: KeyWord):Observable<KeyWord>{
    return this.http.post<KeyWord>(this.baseUrl, newKeyWord);
  }
  DeleteUser(keyWordId: number):Observable<void>{
    return this.http.delete<void>(this.baseUrl+"/"+keyWordId);
  }
  EditUser(id: number, editKeyWord: KeyWord):Observable<void>{
    return this.http.put<void>(this.baseUrl+"/"+id, editKeyWord);
  }
}