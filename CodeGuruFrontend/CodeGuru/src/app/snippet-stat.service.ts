import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SnippetStat } from './snippet-stat';
import { Secret } from './Secret';
import { Snippets } from './snippets';

@Injectable({
  providedIn: 'root'
})
export class SnippetStatService {

  secret: Secret = new Secret();
  baseUrl : string = this.secret.snippetStatUrl

  constructor(private http:HttpClient) { }

  getSnippetStats(userId: number):Observable<Snippets[]>{
    console.log('service ' + userId)
    return this.http.post<Snippets[]>(this.baseUrl + '/favorites', userId);
  }
  AddSnippetStat(newSnippetStat: SnippetStat):Observable<void>{
    return this.http.post<void>(this.baseUrl, newSnippetStat)
  }
  DeleteSnippetStat(snippetStatId: number):Observable<void>{
    return this.http.delete<void>(this.baseUrl+"/"+snippetStatId);
  }
  EditSnippetStat(snippetStatID: number, editSnippetStat: SnippetStat):Observable<void>{
    return this.http.put<void>(this.baseUrl+"/"+snippetStatID, editSnippetStat);
  }
}
