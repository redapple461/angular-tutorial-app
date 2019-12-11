import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from '../hero';
import { Injectable } from '@angular/core';
import { HEROES } from '../mock-heroes'

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = HEROES;
    return {heroes};
  }

  // if  list of heroes is empty, id's will start from 1, else ids will start from  maxId + 1
  genId(heroes: Hero[]): number {
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 1;
  }
}