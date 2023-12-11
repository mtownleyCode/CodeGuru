import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user';
import { Secret } from './secret';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  secret: Secret = new Secret();  
  baseUrl : string = this.secret.userUrl;
  
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

