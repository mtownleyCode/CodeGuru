import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { SpinnerService } from './spinner/spinner.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateInterceptorService implements HttpInterceptor{
  
  constructor(private spinnerService: SpinnerService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>>{
      const token = "FDSA";

      if (token){
        req = req.clone({ 
          setHeaders: {Authorization: 'Bearer' + token}
         })
      }
      this.spinnerService.requestStarted();
      

      return next.handle(req), this.handler(next,req);
    }

    handler(next, request) {
      return next.handle(request)
      .pipe(
          tap(
              (event) => {
                  if (event instanceof HttpResponse){
                      this.spinnerService.requestEnded();
                  }
              },
              (error: HttpErrorResponse) => {
                  this.spinnerService.resetSpinner();
                  throw error;
              }
          )
      )
  }
}
