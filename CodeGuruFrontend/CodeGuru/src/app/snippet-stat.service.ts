import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SnippetStat } from './snippet-stat';

@Injectable({
  providedIn: 'root'
})
export class SnippetStatService {
  baseUrl : string = "https://localhost:7199/api/SnippetStat"
  constructor(private http:HttpClient) { }

  getSnippetStat():Observable<SnippetStat>{
    return this.http.get<SnippetStat>(this.baseUrl);
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
