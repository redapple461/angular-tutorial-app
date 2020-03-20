import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, retryWhen } from 'rxjs/operators';
import { AuthService } from './auth.service';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RefreshTokenService implements HttpInterceptor {
  constructor(private authService: AuthService) { }
  //  🔥🔥🔥 implements function 🔥🔥🔥
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
     // tslint:disable-next-line: align
     /*return next.handle(request).pipe(
        catchError(this.handleError<Hero[]>('getHeroes', []))
      );
    )*/
    return next.handle(request).pipe(
      tap(event => {
        console.log(event);
        if (event instanceof HttpResponse) {
          console.log('succeed');
        }
      }, error => {
          console.log(error);
          if (error.message === 'token expired') {
            console.log('refreshing');
            this.authService.updateToken(JSON.parse(localStorage.getItem('userData')).refToken);
            const newReq = request.clone();
            return next.handle(newReq);
          }
      })
    );
  }

  public handleError<T>() {

    return (error: any): Observable<T> => {
      if (error instanceof HttpErrorResponse) {
        if (error.status === 401) {
          console.log('refreshing');
          this.authService.updateToken(JSON.parse(localStorage.getItem('userData')).refToken);
          return;
        }
      }
      return;
    };
  }
}
