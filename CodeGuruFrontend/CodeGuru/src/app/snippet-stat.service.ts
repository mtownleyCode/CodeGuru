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

  snippetStats: SnippetStat[] = [];

  secret: Secret = new Secret();
  baseUrl : string = this.secret.snippetStatUrl

  constructor(private http:HttpClient) { }

  GetSnippets(userId: number):Observable<SnippetStat[]>{
    return this.http.get<SnippetStat[]>(this.baseUrl + "/" + userId);
  }
  getFavoriteSnippets(userId: number):Observable<Snippets[]>{
    return this.http.post<Snippets[]>(this.baseUrl + '/favorites', userId);
  }
  AddSnippetStat(newSnippetStat: SnippetStat):Observable<SnippetStat>{
    return this.http.post<SnippetStat>(this.baseUrl, newSnippetStat)
  }
  DeleteSnippetStat(snippetStat: SnippetStat):Observable<void>{
    return this.http.post<void>(this.baseUrl + "/delete", snippetStat);
  }
  EditSnippetStat(snippetStatID: number, editSnippetStat: SnippetStat):Observable<void>{
    return this.http.put<void>(this.baseUrl+"/"+snippetStatID, editSnippetStat);
  }
}
