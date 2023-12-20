import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Snippets } from './snippets';
import { Secret } from './Secret';
@Injectable({
  providedIn: 'root'
})
export class SnippetsService {

  snippets: Snippets[] = [];

  secret: Secret = new Secret();
  baseUrl : string = this.secret.snippetsUrl
  
  constructor(private http:HttpClient) { }

  GetSnippets():Observable<Snippets[]>{
    return this.http.get<Snippets[]>(this.baseUrl);
  }
  AddSnippets(newSnippet: Snippets):Observable<Snippets>{
    return this.http.post<Snippets>(this.baseUrl, newSnippet);
  }
  DeleteSnippets(snippetId: number):Observable<void>{    
    return this.http.delete<void>(this.baseUrl+"/"+snippetId);
  }
  SaveSnippet(saveSnippet: Snippets): Observable<Snippets> {
    return this.http.post<Snippets>(this.baseUrl + "/", saveSnippet );
  }
  EditSnippets(id: number, editSnippets: Snippets):Observable<void>{
    return this.http.put<void>(this.baseUrl+"/"+id, editSnippets);
  }
}
