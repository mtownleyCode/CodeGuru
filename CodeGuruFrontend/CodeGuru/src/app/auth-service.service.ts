import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user';
import { LoginCredentials } from './login-credentials';
import { Observable } from 'rxjs';
import { JwtAuth } from './jwt-auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  Login(loginCredentials: LoginCredentials):Observable<JwtAuth> {
    return this.http.post<JwtAuth>('https://localhost:7199/api/auth/login', loginCredentials)
  
  }

  Register(user: User):Observable<JwtAuth>{
    return this.http.post<JwtAuth>('https://localhost:7199/api/auth/register', user)
  }

}
