import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Snippets } from './snippets';

@Injectable({
  providedIn: 'root'
})
export class SnippetsService {

  baseUrl : string = "https://localhost:7199/api/Snippets"
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
