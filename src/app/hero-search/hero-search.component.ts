import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { Hero } from '../models/hero.model.';
import { HeroService } from '../services/hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: [ './hero-search.component.css' ]
})
export class HeroSearchComponent implements OnInit {
  heroes$: Observable<Hero[]>;
  private searchTerms = new Subject<string>();

  constructor(private heroService: HeroService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }


  ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe(
      // 300ms delay before start searching
      debounceTime(300),

      // chech that search term  is not the same as previous
      distinctUntilChanged(),

      // start new search when search term was changed
      switchMap((term: string) => this.heroService.searchHeroes(term)),
    );
  }
}
