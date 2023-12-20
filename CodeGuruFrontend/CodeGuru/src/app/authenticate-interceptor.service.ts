import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateInterceptorService {

    constructor(private userService: UserService){}
    intercept(req: HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>>{

      const token = this.userService.currentUser.token;

      if (token){
        console.log(this.userService.currentUser.token)
        req = req.clone({ 
          setHeaders: {Authorization: 'Bearer ' + token}
         })
      }

      return next.handle(req)

    }
}
