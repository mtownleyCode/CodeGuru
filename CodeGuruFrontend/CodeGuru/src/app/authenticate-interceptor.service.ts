import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateInterceptorService implements HttpInterceptor{

    intercept(req: HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>>{
      const token = "FDSA";

      if (token){
        req = req.clone({ 
          setHeaders: {Authorization: 'Bearer' + token}
         })
      }

      return next.handle(req)

    }
}
