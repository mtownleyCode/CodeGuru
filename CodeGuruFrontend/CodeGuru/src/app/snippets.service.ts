import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Snippets } from './snippets';
import { Secret } from './Secret';

@Injectable({
  providedIn: 'root'
})
export class SnippetsService {
  secret: Secret = new Secret();
  baseUrl : string = this.secret.snippetsUrl;
  
  constructor(private http:HttpClient) { }

  GetUser():Observable<Snippets>{
    return this.http.get<Snippets>(this.baseUrl);
  }
  AddUser(newSnippet: Snippets):Observable<Snippets>{
    return this.http.post<Snippets>(this.baseUrl, newSnippet);
  }
  DeleteUser(snippetId: number):Observable<void>{
    return this.http.delete<void>(this.baseUrl+"/"+snippetId);
  }
  EditUser(id: number, editSnippets: Snippets):Observable<void>{
    return this.http.put<void>(this.baseUrl+"/"+id, editSnippets);
  }
}
