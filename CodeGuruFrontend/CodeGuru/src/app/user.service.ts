import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user';
import { Secret } from './Secret';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  secret: Secret = {} as Secret;
  baseUrl : string = this.secret.usersUrl
  
  constructor(private http:HttpClient) { }

  GetUser():Observable<User>{
    return this.http.get<User>(this.baseUrl);
  }
  AddUser(newUser: User):Observable<User>{
    return this.http.post<User>(this.baseUrl, newUser);
  }
  DeleteUser(userId: number):Observable<void>{
    return this.http.delete<void>(this.baseUrl+"/"+userId);
  }
  EditUser(id: number, editUser: User):Observable<void>{
    return this.http.put<void>(this.baseUrl+"/"+id, editUser);
  }
} 

