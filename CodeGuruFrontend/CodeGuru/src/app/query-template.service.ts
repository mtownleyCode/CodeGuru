import { Injectable, Query } from '@angular/core';
import { Secret } from './Secret';
import { Observable } from 'rxjs';
import { QueryTemplate } from './query-template';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QueryTemplateService {

queryTemplate: QueryTemplate[] = [];

  secret: Secret = new Secret();
  baseUrl: string = this.secret.queriesUrl

  constructor(private http:HttpClient) { }

  GetQueryTemplates():Observable<QueryTemplate[]>{
    return this.http.get<QueryTemplate[]>(this.baseUrl);
    
  }
  
}
