import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RefreshTokenService implements HttpInterceptor {
  refToken = JSON.parse(localStorage.getItem('userData')).refToken;
  constructor(private authService: AuthService) { }
  //  🔥🔥🔥 implements function 🔥🔥🔥
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
     // tslint:disable-next-line: align
     /*return next.handle(request).pipe(
        catchError(this.handleError<Hero[]>('getHeroes', []))
      );
    )*/
    return next.handle(request).pipe(tap (() => {}), catchError(this.handleError<any>()));
  }

  public handleError<T>() {

    return (error: any): Observable<T> => {
      if (error instanceof HttpErrorResponse) {
        if (error.status === 401) {
          this.authService.updateToken(this.refToken);
        }
      }
      return;
    };
  }
}
