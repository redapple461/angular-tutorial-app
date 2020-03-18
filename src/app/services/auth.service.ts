import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseInterface } from '../models/response.model';

@Injectable({
  providedIn: 'root'
})
// tslint:disable: align
export class AuthService {
  constructor(public http: HttpClient) {}
  // ...
  public isAuthenticated(): boolean {
    const jwtHelper: JwtHelperService = new JwtHelperService();
    const token = JSON.parse(localStorage.getItem('userData')).authToken;
    const refToken = JSON.parse(localStorage.getItem('userData')).refToken;
    console.log(token);
    // Check whether the token is expired and return
    // true or false
    return !jwtHelper.isTokenExpired(token);
  }

  public signIn(email: string, password: string): Observable<ResponseInterface> {
    return this.http.post<ResponseInterface>('http://localhost:4000/auth/login', {email, password});
  }

  public register(email: string,  name: string, surname: string, phone: string, password: string) {
    return this.http.post('http://localhost:4000/auth/register', {email, password, name, surname, phone});
  }

  public sendEmail(email: string): Observable<ResponseInterface> {
    return this.http.post<ResponseInterface>('http://localhost:4000/auth/forgot', {email});
  }

  public changePassword(password: string, token: string): Observable<ResponseInterface> {
    return this.http.post<ResponseInterface>('http://localhost:4000/auth/resetPassword', {password}, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: token
       })
    });
  }

  public updateToken(refToken): Observable<ResponseInterface> {
    return this.http.post<ResponseInterface>('http://localhost:4000/auth/refreshToken', {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            authorization: refToken
        })
    });
  }
}
