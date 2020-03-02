import { Injectable } from '@angular/core';
import { HttpDownloadProgressEvent, HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user.model';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private token = JSON.parse(localStorage.getItem('userData')).token;
  httpOptions = {
    headers: new HttpHeaders({
       'Content-Type': 'application/json',
       authorization: this.token
      })
  };
  constructor(private http: HttpClient, private messageService: MessageService) {

  }

  getUser(id: string): Observable<User> {
    return this.http.get<User>(`http://localhost:4000/user/getUser/${id}`, this.httpOptions).pipe(
      tap(() => this.log(`get user id=${id}`)),
        catchError(this.handleError<User>(`getUser id=${id}`))
    );
  }

  updateUser(id: string, newUser: User): Observable<User> {
    console.log('ky')
    return this.http.put<User>(`http://localhost:4000/user/updateUser/${id}`, newUser , this.httpOptions).pipe(
      tap(() => this.log(`update user id=${id}`)),
        catchError(this.handleError<User>(`updateUser id=${id}`))
    );
  }
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

   // method to handle errors
   public handleError<T>(operation: string, result?: T) {
    return (error: any): Observable<T> => {
      this.log(`${operation} failed: ${error.message}`);
      // app should still running so returning empty arr
      return of(result as T);
    };
  }
}
