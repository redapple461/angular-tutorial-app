import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(public http: HttpClient) {}
  // ...
  public isAuthenticated(): boolean {
    const jwtHelper: JwtHelperService = new JwtHelperService();
    const token = JSON.parse(localStorage.getItem('userData')).token;
    console.log(token);
    // Check whether the token is expired and return
    // true or false
    return !jwtHelper.isTokenExpired(token);
  }

  public signIn(email: string, password: string) {
    return this.http.post('http://localhost:4000/auth/login', {email, password});
  }

  public register(email: string, password: string, name: string, surname: string, phone: string) {
    return this.http.post('http://localhost:4000/auth/register', {email, password, name, surname, phone});
  }
}
