import { Injectable, EventEmitter } from '@angular/core';
import { Hero } from '../models/hero.model.';
import { Observable, of } from 'rxjs';
import { MessageService} from '../services/message.service'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private token: string = JSON.parse(localStorage.getItem('userData')).authToken;
  private heroesUrl = 'http://localhost:4000/';
  share: EventEmitter<string> = new EventEmitter();
  private universe = '';

  constructor(private messageService: MessageService, private http: HttpClient) {}


  // headers for http
  httpOptions = {
    headers: new HttpHeaders({
       'Content-Type': 'application/json',
       authorization: this.token
      })
  };

  public setUrl(url: string) {
    this.heroesUrl = url;
  }

  public getStudio() {
    return this.universe;
  }

  public setStudio(universe: string) {
    this.universe = universe;
  }

  // get all heroes from server
  getHeroes(): Observable<Hero[]> {
    this.messageService.add('HeroService: fetched heroes');
    return this.http.get<Hero[]>(this.heroesUrl + 'getHeroes', this.httpOptions)
      .pipe(
        catchError(this.handleError<Hero[]>('getHeroes', []))
      );
  }
  // get hero by id from server
  getHero(name: string): Observable<Hero> {
    this.messageService.add(`HeroService: fetched hero name=${name}`);
    const url = `${this.heroesUrl}getHero/${name}`;
    return this.http.get<Hero>(url, this.httpOptions).pipe(
       tap(() => this.log(`fetched hero id=${name}`)),
         catchError(this.handleError<Hero>(`getHero name=${name}`))
     );
  }
  // add hero ( http - post)
  addHero(hero: Hero): Observable<Hero> {
    console.log(this.token);
    return this.http.post<Hero>(this.heroesUrl + 'addHero', hero, this.httpOptions).pipe(
      tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  // delete hero (http - delete)
  deleteHero(hero: Hero | string): Observable<Hero> {
    const name = typeof hero === 'string' ? hero : hero.name;
    const url = `${this.heroesUrl}deleteHero/${name}`;
    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap(() => this.log(`deleted hero id=${name}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }

  // update hero (http - put)
  updateHero(hero: Hero, oldName: string): Observable<any> {
    return this.http.put(`${this.heroesUrl}updateHero/${oldName}`, hero, this.httpOptions).pipe(
      tap(() => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<Hero>('updateHero'))
    );
  }

  getTotalCount(): Observable<any> {
    return this.http.get(`${this.heroesUrl}getTotalCount`, this.httpOptions);
  }

  // seach heroes by name
  searchHeroes(term: string): Observable<Hero[]> {
    // check that search term is not empty
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}getHero/${term}`, this.httpOptions).pipe(
      tap(() => this.log(`found heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }
  // loging using MessageService
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  // method to handle errors
  public handleError<T>(operation: string, result?: T) {

    return (error: any): Observable<T> => {
      console.log(operation+ '       ' + result+ ' '+ error);
      this.log(`${operation} failed: ${error.message}`);
      // app should still running so returning empty arr
      return of(result as T);
    };
  }

}
