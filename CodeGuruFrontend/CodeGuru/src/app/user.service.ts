import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user';
import { Secret } from './Secret';
import { LoginCredentials } from './login-credentials';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  currentUser: User = {} as User;

  secret: Secret = new Secret();
  baseUrl : string = this.secret.usersUrl
  
  constructor(private http:HttpClient) { }

  GetUserFromLoginInformation(loginCredentials: LoginCredentials):Observable<User>{
    return this.http.post<User>(this.baseUrl + "/login", loginCredentials)
  }
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

